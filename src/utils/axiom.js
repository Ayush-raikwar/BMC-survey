import axios from "axios";

const get = async (url, options) => resolver(axios.get(url, options));

const post = async (url, body, options) =>
  resolver(axios.post(url, body, options));

const patch = async (url, body, options) =>
  resolver(axios.patch(url, body, options));

const remove = async (url, body, options) =>
  resolver(axios.delete(url, body, options));

const resolver = async (promise) => {
  let data,
    error = null;
  try {
    let response = await promise;
    data = response.data;
  } catch (err) {
    error = err;
  }

  return [data, error];
};

export default {
  get,
  post,
  patch,
  remove
};
