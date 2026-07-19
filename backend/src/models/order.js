const mongoose = require('mongoose');
const crypto = require('crypto');

const ORDER_STATUSES = [
  'pending',
  'confirmed',
  'preparing',
  'ready',
  'out_for_delivery',
  'delivered',
  'cancelled',
];

const PAYMENT_STATUSES = ['pending', 'authorized', 'paid', 'failed', 'refunded'];

const OrderItemSchema = new mongoose.Schema(
  {
    menuItemId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPriceCents: { type: Number, required: true, min: 0 },
    notes: { type: String, trim: true, maxlength: 500 },
  },
  { _id: false }
);

const PricingSchema = new mongoose.Schema(
  {
    subtotalCents: { type: Number, required: true, min: 0, default: 0 },
    deliveryFeeCents: { type: Number, required: true, min: 0, default: 0 },
    serviceFeeCents: { type: Number, required: true, min: 0, default: 0 },
    taxCents: { type: Number, required: true, min: 0, default: 0 },
    totalCents: { type: Number, required: true, min: 0, default: 0 },
    currency: { type: String, required: true, trim: true, uppercase: true, default: 'USD' },
  },
  { _id: false }
);

const DeliveryAddressSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    line1: { type: String, required: true, trim: true },
    line2: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    postalCode: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true, default: 'US' },
  },
  { _id: false }
);

const StatusHistorySchema = new mongoose.Schema(
  {
    status: { type: String, enum: ORDER_STATUSES, required: true },
    changedAt: { type: Date, default: Date.now },
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
      default: () => `ORD-${Date.now()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`,
    },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true, index: true },
    items: {
      type: [OrderItemSchema],
      validate: {
        validator(items) {
          return items.length > 0;
        },
        message: 'Order must include at least one item',
      },
    },
    pricing: { type: PricingSchema, required: true },
    deliveryAddress: { type: DeliveryAddressSchema, required: true },
    status: { type: String, enum: ORDER_STATUSES, default: 'pending', index: true },
    statusHistory: {
      type: [StatusHistorySchema],
      default: () => [{ status: 'pending' }],
    },
    payment: {
      status: { type: String, enum: PAYMENT_STATUSES, default: 'pending' },
      provider: { type: String, trim: true },
      providerPaymentId: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

OrderSchema.index({ restaurant: 1, status: 1, createdAt: -1 });
OrderSchema.index({ customer: 1, createdAt: -1 });

OrderSchema.pre('validate', function (next) {
  if (!this.orderNumber) {
    this.orderNumber = `ORD-${Date.now()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
  }

  const subtotal = this.items.reduce((sum, item) => sum + item.unitPriceCents * item.quantity, 0);

  if (!this.pricing) {
    this.pricing = {};
  }

  this.pricing.subtotalCents = subtotal;
  this.pricing.totalCents =
    subtotal +
    (this.pricing.deliveryFeeCents || 0) +
    (this.pricing.serviceFeeCents || 0) +
    (this.pricing.taxCents || 0);

  next();
});

OrderSchema.methods.transitionTo = function (status, changedBy) {
  this.status = status;
  this.statusHistory.push({ status, changedBy });
};

module.exports = mongoose.model('Order', OrderSchema);
module.exports.ORDER_STATUSES = ORDER_STATUSES;
module.exports.PAYMENT_STATUSES = PAYMENT_STATUSES;
