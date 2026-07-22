const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');
const { authenticate, requireRestaurantOwner } = require('../middleware/authMiddleware');

router.get('/', async (req, res, next) => {
  try {
    const { restaurantId } = req.query;

    if (!restaurantId) {
      return res.status(400).json({ message: 'restaurantId query parameter is required' });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    return res.status(200).json({ menu: restaurant.menu || [] });
  } catch (error) {
    return next(error);
  }
});

router.post('/', authenticate, requireRestaurantOwner, async (req, res, next) => {
  try {
    const { restaurantId, name, description, sortOrder, items } = req.body;

    if (!restaurantId || !name) {
      return res.status(400).json({ message: 'Validation failed' });
    }

    if (!Array.isArray(items)) {
      return res.status(400).json({ message: 'Validation failed' });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    if (restaurant.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only modify your own restaurant menus' });
    }

    const category = {
      name,
      description,
      sortOrder,
      items: items.map((item) => ({
        name: item.name,
        description: item.description,
        imageUrl: item.imageUrl,
        priceCents: item.priceCents,
        isAvailable: item.isAvailable !== false,
      })),
    };

    restaurant.menu.push(category);
    await restaurant.save();

    const createdCategory = restaurant.menu[restaurant.menu.length - 1];
    return res.status(201).json({ menuCategory: createdCategory });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
