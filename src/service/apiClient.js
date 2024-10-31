import { API_URL } from './constants';

async function login(email, password) {
  return await post('login', { email, password }, false);
}

async function register(email, password) {
  const res = await post('users', { email, password }, false);

  if (res.status === 'fail') {
    return res;
  }

  return await login(email, password);
}

async function updateProfile(
  userId,
  firstName,
  lastName,
  bio,
  username,
  githubUsername,
  profilePicture,
  mobile
) {
  return await patch(`users/${userId}`, {
    firstName,
    lastName,
    bio,
    username,
    githubUsername,
    profilePicture,
    mobile
  });
}

async function getUserData(userId) {
  const res = await get(`users/${userId}`);
  return res.data.user;
}

async function getPosts() {
  const res = await get('posts');
  return res.data.posts;
}

async function getCohorts() {
  const res = await get('cohorts');
  return res.data.cohorts;
}

async function post(endpoint, data, auth = true) {
  return await request('POST', endpoint, data, auth);
}

async function patch(endpoint, data, auth = true) {
  return await request('PATCH', endpoint, data, auth);
}

async function get(endpoint, auth = true) {
  return await request('GET', endpoint, null, auth);
}

async function request(method, endpoint, data, auth = true) {
  const opts = {
    headers: {
      'Content-Type': 'application/json'
    },
    method
  };

  if (method.toUpperCase() !== 'GET') {
    opts.body = JSON.stringify(data);
  }

  if (auth) {
    // eslint-disable-next-line dot-notation
    opts.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  }

  const response = await fetch(`${API_URL}/${endpoint}`, opts);

  return response.json();
}

export { login, getPosts, register, updateProfile, getCohorts, getUserData };
