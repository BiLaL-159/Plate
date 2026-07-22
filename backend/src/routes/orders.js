const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Restaurant = require('../models/restaurant');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/', authenticate, async (req, res, next) => {
  try {
    const query = req.user.role === 'restaurant_owner'
      ? { restaurant: { $in: [] } }
      : { customer: req.user._id };

    if (req.user.role === 'restaurant_owner') {
      const restaurants = await Restaurant.find({ owner: req.user._id }).select('_id');
      query.restaurant = { $in: restaurants.map((restaurant) => restaurant._id) };
    }

    const orders = await Order.find(query).sort({ createdAt: -1 }).limit(50);

    return res.status(200).json({ orders });
  } catch (error) {
    return next(error);
  }
});

router.post('/', authenticate, async (req, res, next) => {
  try {
    if (req.user.role !== 'customer') {
      return res.status(403).json({ message: 'Customer access required' });
    }

    const restaurantId = req.body.restaurantId || req.body.restaurant;

    if (!restaurantId || !Array.isArray(req.body.items) || req.body.items.length === 0) {
      return res.status(400).json({ message: 'Validation failed' });
    }

    if (!req.body.deliveryAddress || !req.body.deliveryAddress.line1 || !req.body.deliveryAddress.city || !req.body.deliveryAddress.state || !req.body.deliveryAddress.postalCode || !req.body.deliveryAddress.country) {
      return res.status(400).json({ message: 'Validation failed' });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const order = new Order({
      customer: req.user._id,
      restaurant: restaurant._id,
      items: req.body.items.map((item) => ({
        menuItemId: item.menuItemId,
        name: item.name,
        quantity: item.quantity,
        unitPriceCents: item.unitPriceCents,
        notes: item.notes,
      })),
      pricing: req.body.pricing || {},
      deliveryAddress: req.body.deliveryAddress,
      payment: req.body.payment || {},
    });

    await order.save();

    return res.status(201).json(order);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const isCustomer = order.customer.toString() === req.user._id.toString();
    const restaurant = await Restaurant.findById(order.restaurant);
    const isRestaurantOwner = req.user.role === 'restaurant_owner' && restaurant && restaurant.owner.toString() === req.user._id.toString();

    if (!isCustomer && !isRestaurantOwner) {
      return res.status(403).json({ message: 'Order access denied' });
    }

    return res.status(200).json(order);
  } catch (error) {
    return next(error);
  }
});

router.patch('/:id/status', authenticate, async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (req.user.role !== 'restaurant_owner') {
      return res.status(403).json({ message: 'Only restaurant owners can update order status' });
    }

    const restaurant = await Restaurant.findById(order.restaurant);
    if (!restaurant || restaurant.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only update orders for your own restaurant' });
    }

    order.transitionTo(req.body.status, req.user._id);
    await order.save();

    return res.status(200).json(order);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
