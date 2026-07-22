const test = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');
const { once } = require('events');

process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/plate-test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

const Restaurant = require('../src/models/restaurant');
const User = require('../src/models/user');
const createApp = require('../src/app');

function createServer() {
  const app = createApp();
  return app.listen(0);
}

async function request(server, pathName, options = {}) {
  const { port } = server.address();
  const response = await fetch(`http://127.0.0.1:${port}${pathName}`, {
    ...options,
    headers: {
      'content-type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  let body = text;

  try {
    body = JSON.parse(text);
  } catch (_error) {
    // leave as text for non-JSON responses
  }

  return { status: response.status, body };
}

test('GET /api/restaurants returns a paginated payload', async () => {
  const originalFind = Restaurant.find;
  const originalCountDocuments = Restaurant.countDocuments;

  Restaurant.find = () => ({
    sort: () => ({
      skip: () => ({
        limit: async () => [],
      }),
    }),
  });
  Restaurant.countDocuments = async () => 0;

  const server = await createServer();

  try {
    const response = await request(server, '/api/restaurants?limit=5&page=1');
    assert.equal(response.status, 200);
    assert.equal(response.body.restaurants.length, 0);
    assert.equal(response.body.pagination.page, 1);
  } finally {
    Restaurant.find = originalFind;
    Restaurant.countDocuments = originalCountDocuments;
    server.close();
  }
});

test('GET /api/restaurants supports filtering and sorting parameters', async () => {
  const originalFind = Restaurant.find;
  const originalCountDocuments = Restaurant.countDocuments;
  const filterLog = [];

  Restaurant.find = (filter) => {
    filterLog.push(filter);
    return {
      sort: () => ({
        skip: () => ({
          limit: async () => [{ name: 'Filtered Kitchen' }],
        }),
      }),
    };
  };
  Restaurant.countDocuments = async (filter) => {
    filterLog.push(filter);
    return 1;
  };

  const server = await createServer();

  try {
    const response = await request(server, '/api/restaurants?cuisine=Italian&status=active&search=Pizza&priceRange=$$&tag=vegan&sortBy=createdAt&sortOrder=desc');
    assert.equal(response.status, 200);
    assert.equal(response.body.restaurants[0].name, 'Filtered Kitchen');
    assert.equal(response.body.pagination.page, 1);
    assert.ok(filterLog[0].cuisine instanceof RegExp);
    assert.equal(filterLog[0].status.$ne, 'archived');
    assert.equal(filterLog[1].status.$ne, 'archived');
  } finally {
    Restaurant.find = originalFind;
    Restaurant.countDocuments = originalCountDocuments;
    server.close();
  }
});

test('POST /api/restaurants validates required fields', async () => {
  const originalFindById = User.findById;
  User.findById = async () => ({ _id: 'owner-id', role: 'restaurant_owner' });

  const server = await createServer();

  try {
    const token = jwt.sign({ id: 'owner-id', role: 'restaurant_owner' }, process.env.JWT_SECRET);
    const response = await request(server, '/api/restaurants', {
      method: 'POST',
      headers: { authorization: `Bearer ${token}` },
      body: JSON.stringify({
        cuisine: 'Italian',
      }),
    });

    assert.equal(response.status, 400);
    assert.equal(response.body.message, 'Validation failed');
  } finally {
    User.findById = originalFindById;
    server.close();
  }
});

test('POST /api/restaurants requires authentication for restaurant owners', async () => {
  const server = await createServer();

  try {
    const response = await request(server, '/api/restaurants', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test Kitchen',
        cuisine: 'Italian',
        address: {
          line1: '123 Main St',
          city: 'Seattle',
          state: 'WA',
          postalCode: '98101',
          country: 'US',
        },
      }),
    });

    assert.equal(response.status, 401);
  } finally {
    server.close();
  }
});

test('POST /api/restaurants creates a restaurant for an authenticated owner', async () => {
  const originalFindById = User.findById;
  const originalSave = Restaurant.prototype.save;

  User.findById = async () => ({ _id: 'owner-id', role: 'restaurant_owner' });
  Restaurant.prototype.save = async function () {
    this._id = 'restaurant-id';
    return this;
  };

  const server = await createServer();

  try {
    const token = jwt.sign({ id: 'owner-id', role: 'restaurant_owner' }, process.env.JWT_SECRET);
    const response = await request(server, '/api/restaurants', {
      method: 'POST',
      headers: { authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name: 'Test Kitchen',
        cuisine: 'Italian',
        address: {
          line1: '123 Main St',
          city: 'Seattle',
          state: 'WA',
          postalCode: '98101',
          country: 'US',
        },
      }),
    });

    assert.equal(response.status, 201);
    assert.equal(response.body.name, 'Test Kitchen');
  } finally {
    User.findById = originalFindById;
    Restaurant.prototype.save = originalSave;
    server.close();
  }
});

test('POST /api/menus rejects invalid category payloads', async () => {
  const originalFindById = User.findById;
  const originalRestaurantFindById = Restaurant.findById;

  User.findById = async () => ({ _id: 'owner-id', role: 'restaurant_owner' });
  Restaurant.findById = async () => ({
    _id: 'restaurant-id',
    owner: { toString: () => 'owner-id' },
    menu: [],
    save: async function () {
      return this;
    },
  });

  const server = await createServer();

  try {
    const token = jwt.sign({ id: 'owner-id', role: 'restaurant_owner' }, process.env.JWT_SECRET);
    const response = await request(server, '/api/menus', {
      method: 'POST',
      headers: { authorization: `Bearer ${token}` },
      body: JSON.stringify({
        restaurantId: 'restaurant-id',
        description: 'Lunch specials',
      }),
    });

    assert.equal(response.status, 400);
    assert.equal(response.body.message, 'Validation failed');
  } finally {
    User.findById = originalFindById;
    Restaurant.findById = originalRestaurantFindById;
    server.close();
  }
});

test('POST /api/orders only allows customers to create orders', async () => {
  const originalFindById = User.findById;
  const originalRestaurantFindById = Restaurant.findById;

  User.findById = async () => ({ _id: 'owner-id', role: 'restaurant_owner' });
  Restaurant.findById = async () => ({
    _id: 'restaurant-id',
    name: 'Test Kitchen',
  });

  const server = await createServer();

  try {
    const token = jwt.sign({ id: 'owner-id', role: 'restaurant_owner' }, process.env.JWT_SECRET);
    const response = await request(server, '/api/orders', {
      method: 'POST',
      headers: { authorization: `Bearer ${token}` },
      body: JSON.stringify({
        restaurantId: 'restaurant-id',
        items: [{ name: 'Pizza', quantity: 1, unitPriceCents: 1000 }],
        deliveryAddress: {
          name: 'Ada',
          phone: '555-5555',
          line1: '123 Main St',
          city: 'Seattle',
          state: 'WA',
          postalCode: '98101',
          country: 'US',
        },
      }),
    });

    assert.equal(response.status, 403);
    assert.equal(response.body.message, 'Customer access required');
  } finally {
    User.findById = originalFindById;
    Restaurant.findById = originalRestaurantFindById;
    server.close();
  }
});
