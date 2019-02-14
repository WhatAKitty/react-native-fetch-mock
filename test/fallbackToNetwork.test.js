import 'babel-polyfill';
import expect from 'expect.js';
import FetchMock, { Mock } from '../src';

const fetch1 = new FetchMock(require('../__mocks__'), {
  delay: 200,   // delay 200ms
  fetch: require('isomorphic-fetch'),
  fallbackToNetwork: false
}).fetch;
describe('test fetch mock with fallbackToNetwork=false', () => {
  it('fetch /api/no-mocked', async () => {
    try {
      await fetch1('/api/no-mocked');
    } catch (e) {
      expect(e.toString()).to.be.eql('Error: No url /api/no-mocked is defined.')
    }
  }).timeout(20000);
});

const fetch2 = new FetchMock(require('../__mocks__'), {
  delay: 200,   // delay 200ms
  fetch: require('isomorphic-fetch'),
  fallbackToNetwork: true
}).fetch;
describe('test fetch mock with fallbackToNetwork=true', () => {
  it('fetch http://www.baidu.com', async () => {
    const response = await fetch2('http://www.baidu.com');
    const { status } = response;
    expect(status).to.be.eql(200);
  }).timeout(20000);

  it('fetch /api/users/{userId}', async () => {
    const response = await fetch2('/api/users/123');
    const { status } = response;
    expect(status).to.be.eql(200);
    const data = await response.json();
    expect(data).not.to.be(undefined);
    expect(data).not.to.be.empty();
    expect(data).to.be.property('userId', '123');
  }).timeout(20000);
});

const fetch3 = new FetchMock(require('../__mocks__'), {
  delay: 200,   // delay 200ms
  fetch: require('isomorphic-fetch'),
  fallbackToNetwork: 'always'
}).fetch;
describe('test fetch mock with fallbackToNetwork=true', () => {
  it('fetch http://www.baidu.com', async () => {
    const response = await fetch3('http://www.baidu.com');
    const { status } = response;
    expect(status).to.be.eql(200);
  }).timeout(20000);

  it('fetch /api/users/{userId}', async () => {
    try {
    await fetch3('/api/users/123');
    } catch (e) {
      expect(e.toString()).to.be.eql('Error: only absolute urls are supported')
    }
  }).timeout(20000);
});
