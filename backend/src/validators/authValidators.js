const USER_ROLES = ['customer', 'restaurant_owner'];

function required(fieldName) {
  return (value) => {
    if (typeof value !== 'string' || value.trim().length === 0) {
      return `${fieldName} is required`;
    }

    return null;
  };
}

function email(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const normalized = value.trim().toLowerCase();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);

  return isValid ? null : 'Email must be valid';
}

function minLength(fieldName, length) {
  return (value) => {
    if (typeof value !== 'string' || value.trim().length === 0) {
      return null;
    }

    if (value.length < length) {
      return `${fieldName} must be at least ${length} characters`;
    }

    return null;
  };
}

function role(value) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return null;
  }

  return USER_ROLES.includes(value) ? null : 'Role must be customer or restaurant_owner';
}

const signupSchema = {
  name: [required('Name'), minLength('Name', 2)],
  email: [required('Email'), email],
  password: [required('Password'), minLength('Password', 8)],
  role: [required('Role'), role],
};

const loginSchema = {
  email: [required('Email'), email],
  password: [required('Password')],
};

module.exports = {
  signupSchema,
  loginSchema,
  USER_ROLES,
};
