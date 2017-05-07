import 'babel-polyfill';
import expect from 'expect.js';
import { prueUrl, parseUrl, parseRequest, matchUrl } from '../src/util';

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
  it('match url', async () => {
    expect(matchUrl('http://www.baidu.com', 'http://www.baidu.com')).to.ok();
  });
  it('match url with inside parameter', async () => {
    expect(matchUrl('http://www.baidu.com/{id}', 'http://www.baidu.com/123')).to.be.eql({
      result: true,
      params: {
        id: '123',
      },
    });
    expect(matchUrl('http://www.baidu.com/{id}/do', 'http://www.baidu.com/123/do')).to.be.eql({
      result: true,
      params: {
        id: '123',
      },
    });
    expect(matchUrl('http://www.baidu.com/{id}/do/{name}', 'http://www.baidu.com/123/do/hello')).to.be.eql({
      result: true,
      params: {
        id: '123',
        name: 'hello',
      },
    });
  });
  it('match error url with inside parameter', async () => {
    expect(matchUrl('http://www.baidu.com/{id}{name}/do', 'http://www.baidu.com/123/do')).to.be.eql({
      result: false,
    });
    expect(matchUrl('http://www.baidu.com/{id}{name/do', 'http://www.baidu.com/123/do')).to.be.eql({
      result: false,
    });
    expect(matchUrl('http://www.baidu.com/{id}name}/do', 'http://www.baidu.com/123/do')).to.be.eql({
      result: false,
    });
    expect(matchUrl('http://www.baidu.com/{id}/do', 'http://www.baidu.com/123')).to.be.eql({
      result: false,
    });
  });
});
