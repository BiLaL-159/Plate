const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');
const { authenticate, requireRestaurantOwner } = require('../middleware/authMiddleware');

router.get('/', async (req, res, next) => {
  try {
    const page = Math.max(1, Number.parseInt(req.query.page || '1', 10));
    const limit = Math.min(50, Math.max(1, Number.parseInt(req.query.limit || '10', 10)));
    const search = req.query.search ? String(req.query.search).trim() : '';
    const cuisine = req.query.cuisine ? String(req.query.cuisine).trim() : '';
    const status = req.query.status ? String(req.query.status).trim() : '';
    const priceRange = req.query.priceRange ? String(req.query.priceRange).trim() : '';
    const tag = req.query.tag ? String(req.query.tag).trim().toLowerCase() : '';
    const sortBy = req.query.sortBy ? String(req.query.sortBy).trim() : 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    const filter = {};

    if (cuisine) {
      filter.cuisine = new RegExp(cuisine, 'i');
    }

    if (status) {
      filter.status = { $in: [status], $ne: 'archived' };
    } else {
      filter.status = { $ne: 'archived' };
    }

    if (priceRange) {
      filter.priceRange = priceRange;
    }

    if (tag) {
      filter.tags = { $in: [new RegExp(tag, 'i')] };
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { cuisine: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const sortField = ['name', 'cuisine', 'rating.average', 'createdAt'].includes(sortBy) ? sortBy : 'createdAt';

    const [restaurants, total] = await Promise.all([
      Restaurant.find(filter)
        .sort({ [sortField]: sortOrder })
        .skip((page - 1) * limit)
        .limit(limit),
      Restaurant.countDocuments(filter),
    ]);

    return res.status(200).json({
      restaurants,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return next(error);
  }
});

router.post('/', authenticate, requireRestaurantOwner, async (req, res, next) => {
  try {
    const { name, cuisine, description, tags, imageUrl, address, priceRange, deliveryEstimateMinutes, status } = req.body;

    if (!name || !cuisine || !address) {
      return res.status(400).json({ message: 'Validation failed' });
    }

    if (!address.line1 || !address.city || !address.state || !address.postalCode || !address.country) {
      return res.status(400).json({ message: 'Validation failed' });
    }

    const restaurant = new Restaurant({
      owner: req.user._id,
      name,
      cuisine,
      description,
      tags,
      imageUrl,
      address,
      priceRange,
      deliveryEstimateMinutes,
      status,
    });

    await restaurant.save();

    return res.status(201).json(restaurant);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    return res.status(200).json(restaurant);
  } catch (error) {
    return next(error);
  }
});

router.patch('/:id', authenticate, requireRestaurantOwner, async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    if (restaurant.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only update your own restaurant' });
    }

    Object.assign(restaurant, req.body);
    await restaurant.save();

    return res.status(200).json(restaurant);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
