import 'babel-polyfill';
import expect from 'expect.js';
import { prueUrl, parseUrl, parseRequest } from '../src/util';

describe('test util methods', () => {
  it('get prue url', async () => {
    expect(prueUrl('http://www.baidu.com?')).to.eql('http://www.baidu.com');
    expect(prueUrl('http://www.baidu.com?ab=23')).to.eql('http://www.baidu.com');
  });
  it('parse basic url', async () => {
    expect(parseUrl('http://www.baidu.com?')).to.eql({
      url: 'http://www.baidu.com',
      params: {},
    });
    expect(parseUrl('http://www.baidu.com?ab=23')).to.eql({
      url: 'http://www.baidu.com',
      params: {
        ab: '23',
      },
    });
    expect(parseUrl('http://www.baidu.com?ab=23&name=123')).to.eql({
      url: 'http://www.baidu.com',
      params: {
        ab: '23',
        name: '123',
      },
    });
  });
  it('parse error url', async () => {
    expect(parseUrl('http://www.baidu.com?a')).to.eql({
      url: 'http://www.baidu.com',
      params: {},
    });
    expect(parseUrl('http://www.baidu.com?a??=1')).to.eql({
      url: 'http://www.baidu.com',
      params: {},
    });
    expect(parseUrl('http://www.baidu.com?a=1?b=1')).to.eql({
      url: 'http://www.baidu.com',
      params: {
        a: '1',
      },
    });
  });
  it('parse encoded url', async () => {
    expect(parseUrl('http://www.baidu.com?callback=http%20%201')).to.eql({
      url: 'http://www.baidu.com',
      params: {
        callback: 'http  1'
      },
    });
  });
  it('parse request', async () => {
    expect(parseRequest('http://www.baidu.com?callback=http%20%201', {
      headers: {
        'Content-Type': 'application/json',
      }
    })).to.eql({
      method: 'GET',
      url: 'http://www.baidu.com',
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        callback: 'http  1'
      },
    });
  });
});
