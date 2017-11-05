import 'babel-polyfill';
import expect from 'expect.js';
import FetchMock, { Mock } from '../';

const fetch = new FetchMock(require('../__mocks__')).fetch;
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
  });

  it('fetch /api/users?a=b', async () => {
    const response = await fetch('/api/users');
    const { status } = response;
    expect(status).to.be.eql(200);
    const data = await response.json();
    expect(data).not.to.be(undefined);
    expect(data).not.to.be.empty();
    expect(data).to.be.an('array');
    expect(data).to.have.length(2);
  });

  it('fetch /api/users with url parameters', async () => {
    const response = await fetch('/api/users?name=John');
    const { status } = response;
    expect(status).to.be.eql(200);
    const data = await response.json();
    expect(data).not.to.be(undefined);
    expect(data).not.to.be.empty();
    expect(data).to.be.an('array');
    expect(data).to.have.length(1);
  });

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
  });

  it('fetch /api/users/{userId}', async () => {
    const response = await fetch('/api/users/123');
    const { status } = response;
    expect(status).to.be.eql(200);
    const data = await response.json();
    expect(data).not.to.be(undefined);
    expect(data).not.to.be.empty();
    expect(data).to.be.property('userId', '123');
  });

  it('fetch /api/users/mockjs with mockjs', async () => {
    const response = await fetch('/api/users/mockjs');
    const { status } = response;
    expect(status).to.be.eql(200);
    const data = await response.json();
    expect(data).not.to.be(undefined);
    expect(data).not.to.be.empty();
    expect(data).to.be.an('array');
    expect(data).to.have.length(2);
  });

  it('fetch /api/users/mockjs with mockjs', async () => {
    const response = await fetch('/api/users/mockjs');
    const { status } = response;
    expect(status).to.be.eql(200);
    const data = await response.json();
    expect(data).not.to.be(undefined);
    expect(data).not.to.be.empty();
    expect(data).to.be.an('array');
    expect(data).to.have.length(2);
  });

  it('fetch /api/users/{userid} with prue data response', async () => {
    const response = await fetch('/api/users/pru/121');
    const { status } = response;
    expect(status).to.be.eql(200);
    const data = await response.json();
    expect(data).not.to.be(undefined);
    expect(data).not.to.be.empty();
    expect(data).to.be.an('object');
    expect(data).to.be.property('userId', '121');
  });

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
  });

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
  });
});
