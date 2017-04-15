
class FetchMock {
  constructor(required) {
    if ('object' !== typeof required) {
      throw new Error('There is no required defined.');
    }

    this.urls = [];
    this.loadMocks = this.loadMocks.bind(this);
    this.loadMock = this.loadMock.bind(this);
    this.fetch = this.fetch.bind(this);

    this.loadMocks(required);
  }

  loadMocks(required) {
    const __mocks__ = required.default || required;   // es6 import or amd
    let mocks = Object.keys(__mocks__);
    mocks.forEach(key => {
      this.loadMock(key, __mocks__[key]);
    });
  }

  loadMock(key, mock) {
    if ('object' !== typeof mock) {
      if ('function' === typeof mock) {
        this.urls.push({
          url: key,
          func: mock,
        });
      }
      return;
    }
    const keys = Object.keys(mock);
    keys.map(key => {
      this.loadMock(key, mock[key]);
    });
  }

  fetch(url, options) {
    const filters = this.urls.filter(uri => uri.url === url);
    if (!filters || filters.length == 0) throw new Error(`No url ${url} is defined.`);
    const mock = filters[0];
    if ('function' !== typeof mock.func) {
      throw new Error('There is no url defined in __mocks__');
    }
    const promise = mock.func(options);
    if (!promise || 'function' !== typeof promise.then) {
      throw new Error('The result of mock function should be a promise.');
    }
    return promise;
  }
}

export default FetchMock;
export { default as Mock } from 'mockjs';
