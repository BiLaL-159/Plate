const mongoose = require('mongoose');

const PRICE_RANGES = ['$', '$$', '$$$', '$$$$'];
const RESTAURANT_STATUSES = ['draft', 'active', 'paused', 'archived'];

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const AddressSchema = new mongoose.Schema(
  {
    line1: { type: String, required: true, trim: true },
    line2: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    postalCode: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true, default: 'US' },
  },
  { _id: false }
);

const MenuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, trim: true, maxlength: 500 },
    imageUrl: { type: String, trim: true },
    priceCents: { type: Number, required: true, min: 0 },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const MenuCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    description: { type: String, trim: true, maxlength: 300 },
    sortOrder: { type: Number, default: 0 },
    items: [MenuItemSchema],
  },
  { timestamps: true }
);

const RestaurantSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      default() {
        return slugify(this.name);
      },
    },
    description: { type: String, trim: true, maxlength: 1000 },
    cuisine: { type: String, required: true, trim: true, index: true },
    tags: [{ type: String, trim: true, lowercase: true }],
    imageUrl: { type: String, trim: true },
    address: { type: AddressSchema, required: true },
    priceRange: { type: String, enum: PRICE_RANGES, default: '$$' },
    deliveryEstimateMinutes: {
      min: { type: Number, min: 0, default: 20 },
      max: { type: Number, min: 0, default: 40 },
    },
    rating: {
      average: { type: Number, min: 0, max: 5, default: 0 },
      count: { type: Number, min: 0, default: 0 },
    },
    status: { type: String, enum: RESTAURANT_STATUSES, default: 'draft', index: true },
    menu: [MenuCategorySchema],
  },
  { timestamps: true }
);

RestaurantSchema.index({ slug: 1 }, { unique: true });
RestaurantSchema.index({ name: 'text', cuisine: 'text', tags: 'text' });
RestaurantSchema.index({ status: 1, cuisine: 1 });

RestaurantSchema.pre('validate', function (next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name);
  }

  if (this.deliveryEstimateMinutes.min > this.deliveryEstimateMinutes.max) {
    this.invalidate('deliveryEstimateMinutes', 'Minimum delivery estimate cannot exceed maximum');
  }

  next();
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
module.exports.PRICE_RANGES = PRICE_RANGES;
module.exports.RESTAURANT_STATUSES = RESTAURANT_STATUSES;
