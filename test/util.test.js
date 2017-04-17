import 'babel-polyfill';
import expect from 'expect.js';
import { prueUrl } from '../src/util';

describe('test util methods', () => {
  it('get prue url', async () => {
    expect(prueUrl('http://www.baidu.com?')).to.eql('http://www.baidu.com');
    expect(prueUrl('http://www.baidu.com?ab=23')).to.eql('http://www.baidu.com');
  });
});
