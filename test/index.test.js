import 'babel-polyfill';
import expect from 'expect.js';
import FetchMock, { Mock } from '../';

const fetch = new FetchMock(require('../__mocks__')).fetch;
describe('test fetch mock', () => {
  it('fetch /api/users data', async () => {
    const { data } = await fetch('/api/users');
    expect(data).not.to.be(undefined);
    expect(data).not.to.be.empty();
    expect(data).to.be.an('array');
    expect(data).to.have.length(2);
  });

  it('fetch /api/users?a=b', async () => {
    const { data } = await fetch('/api/users');
    expect(data).not.to.be(undefined);
    expect(data).not.to.be.empty();
    expect(data).to.be.an('array');
    expect(data).to.have.length(2);
  });

  it('fetch /api/users with url parameters', async () => {
    const { data } = await fetch('/api/users?name=John');
    expect(data).not.to.be(undefined);
    expect(data).not.to.be.empty();
    expect(data).to.be.an('array');
    expect(data).to.have.length(1);
  });

  it('fetch /api/users with post parameters', async () => {
    const { data } = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John',
      }),
    });
    expect(data).not.to.be(undefined);
    expect(data).not.to.be.empty();
    expect(data).to.be.an('array');
    expect(data).to.have.length(1);
  });

  it('fetch /api/users/mockjs with mockjs', async () => {
    const { data } = await fetch('/api/users/mockjs');
    expect(data).not.to.be(undefined);
    expect(data).not.to.be.empty();
    expect(data).to.be.an('array');
    expect(data).to.have.length(2);
  });

  it('fetch /api/users/mockjs with mockjs', async () => {
    const { data } = await fetch('/api/users/mockjs');
    expect(data).not.to.be(undefined);
    expect(data).not.to.be.empty();
    expect(data).to.be.an('array');
    expect(data).to.have.length(2);
  });
});
