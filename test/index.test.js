import 'babel-polyfill';
import expect from 'expect.js';
import FetchMock, { Mock } from '../src';

const fetch = new FetchMock(require('../__mocks__'), {
  delay: 200,   // delay 200ms
  fetch: require('isomorphic-fetch'),
  exclude: [
    'https://www.amazon.com',
    '/foo/boo/:foo*',
    'http://:foo*',
    'https://:foo*',
  ],
  proxy: [{
    path: '/ip(.*)',
    target: 'https://api.ipify.org',
    process: ({ target }, matches) => {
      return `${target}${matches[1]}`
    }
  }],
}).fetch;
describe('test fetch mock', () => {
  it('fetch /api/users data', async () => {
    const response = await fetch('/api/users');
    const { status } = response;
    expect(status).to.be.eql(200);
    const data = await response.json();
    expect(data).not.to.be(undefined);
    expect(data).not.to.be.empty();
    expect(data).to.be.an('array');
    expect(data).to.have.length(2);
  }).timeout(20000);

  it('fetch /api/users?a=b', async () => {
    const response = await fetch('/api/users');
    const { status } = response;
    expect(status).to.be.eql(200);
    const data = await response.json();
    expect(data).not.to.be(undefined);
    expect(data).not.to.be.empty();
    expect(data).to.be.an('array');
    expect(data).to.have.length(2);
  }).timeout(20000);

  it('fetch /api/users with url parameters', async () => {
    const response = await fetch('/api/users?name=John');
    const { status } = response;
    expect(status).to.be.eql(200);
    const data = await response.json();
    expect(data).not.to.be(undefined);
    expect(data).not.to.be.empty();
    expect(data).to.be.an('array');
    expect(data).to.have.length(1);
  }).timeout(20000);

  it('fetch /api/users with post parameters', async () => {
    const response = await fetch('/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John',
      }),
    });
    const { status } = response;
    expect(status).to.be.eql(200);
    const data = await response.json();
    expect(data).not.to.be(undefined);
    expect(data).not.to.be.empty();
    expect(data).to.be.an('array');
    expect(data).to.have.length(1);
  }).timeout(20000);

  it('fetch /api/users/{userId}', async () => {
    const response = await fetch('/api/users/123');
    const { status } = response;
    expect(status).to.be.eql(200);
    const data = await response.json();
    expect(data).not.to.be(undefined);
    expect(data).not.to.be.empty();
    expect(data).to.be.property('userId', '123');
  }).timeout(20000);

  it('fetch /api/users/mockjs with mockjs', async () => {
    const response = await fetch('/api/users/mockjs');
    const { status } = response;
    expect(status).to.be.eql(200);
    const data = await response.json();
    expect(data).not.to.be(undefined);
    expect(data).not.to.be.empty();
    expect(data).to.be.an('array');
    expect(data).to.have.length(2);
  }).timeout(20000);

  it('fetch /api/users/mockjs with mockjs', async () => {
    const response = await fetch('/api/users/mockjs');
    const { status } = response;
    expect(status).to.be.eql(200);
    const data = await response.json();
    expect(data).not.to.be(undefined);
    expect(data).not.to.be.empty();
    expect(data).to.be.an('array');
    expect(data).to.have.length(2);
  }).timeout(20000);

  it('fetch /api/users/{userid} with prue data response', async () => {
    const response = await fetch('/api/users/pru/121');
    const { status } = response;
    expect(status).to.be.eql(200);
    const data = await response.json();
    expect(data).not.to.be(undefined);
    expect(data).not.to.be.empty();
    expect(data).to.be.an('object');
    expect(data).to.be.property('userId', '121');
  }).timeout(20000);

  it('fetch exclude path', async () => {
    const response = await fetch('https://www.amazon.com');
    const { status } = response;
    expect(status).to.be.eql(200);
    const html = await response.text();
    expect(html).not.to.be(undefined);
    expect(html).not.to.be.empty();
    expect(html).to.be.an('string');
  }).timeout(20000);

  it('post /api/users', async () => {
    const { status } = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John',
      }),
    });
    expect(status).to.be.eql(201);
  }).timeout(20000);

  it('put /api/users/123', async () => {
    const response = await fetch('/api/users/123', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John2',
      }),
    });
    const { status } = response;
    expect(status).to.be.eql(204);
    const data = await response.json();
    expect(data).not.to.be(undefined);
    expect(data).not.to.be.empty();
    expect(data).to.be.an('object');
    expect(data.userId).to.be.eql(123);
  }).timeout(20000);

  it('proxy other api server', async () => {
    const response = await fetch('/ip/?format=json');
    const { status } = response;
    const data = await response.json();
    expect(status).to.be.eql(200);
    expect(data).not.to.be(undefined);
    expect(data).not.to.be.empty();
    expect(data).to.be.an('object');
    expect(data.ip).to.be.an('string');
  }).timeout(20000);

  describe('test delay mock', () => {

    it('global delay', async () => {
      const start = new Date().getTime();
      await fetch('/api/users');
      expect(new Date().getTime() - start).to.greaterThan(199).lessThan(210);
    }).timeout(20000);

    it('method delay 30ms', async () => {
      const start = new Date().getTime();
      await fetch('/api/users', {
        delay: 30,
      });
      expect(new Date().getTime() - start).to.greaterThan(29).lessThan(40);
    }).timeout(20000);

    it('method delay 3000ms', async () => {
      const start = new Date().getTime();
      await fetch('/api/users', {
        delay: 3000,
      });
      expect(new Date().getTime() - start).to.greaterThan(2999).lessThan(3100);
    }).timeout(20000);

  });

});
