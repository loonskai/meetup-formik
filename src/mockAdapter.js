import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios, { delayResponse: 1500 });

let users = ['vasya@mail.com'];

mock.onGet('/').reply(200, 'Hello');
mock.onPost('/signup').reply(({ data }) => {
  const json = JSON.parse(data);
  if (users.find(email => email === json.email)) {
    return [500, 'User already exists'];
  }
  return [200, 'Success'];
});

export default axios;
