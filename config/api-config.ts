
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const endpoints = {
  pets: {
    list: `${API_BASE_URL}/pets`,
    create: `${API_BASE_URL}/pets`,
  },
    weights: {
    list: `${API_BASE_URL}/pets/weights`,
    create: `${API_BASE_URL}/pets/weights`,
  },
};

const methods = {
  get: 'GET',
  post: 'POST',
};

export { endpoints, methods };
