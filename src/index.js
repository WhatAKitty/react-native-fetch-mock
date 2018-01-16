import { parseRequest, matchUrl, isNull } from './util';
import Response from './response';

class FetchMock {
  constructor(required, options = {
    fetch: () => {},
    exclude: [],
  }) {
    if ('object' !== typeof required) {
      throw new Error('There is no required defined.');
    }

    this.urls = [];
    this.raw = options.fetch;
    this.exclude = options.exclude;

    this.loadMocks = this.loadMocks.bind(this);
    this.loadMock = this.loadMock.bind(this);
    this.matchReqUrl = this.matchReqUrl.bind(this);
    this.isExclude = this.isExclude.bind(this);
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
        var items = key.split(' ');
        var method = items.length === 2 ? items[0] : 'GET';
        var url = items.length === 2 ? items[1] : key;
        this.urls.push({
          method,
          url,
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

  matchReqUrl(request) {
    let insideParams;
    const filters = this.urls.filter(uri => {
      const obj = matchUrl(uri.url, request.url);
      if (obj.result && uri.method.toUpperCase() === request.method.toUpperCase()) {
        insideParams = obj.params;
        return true;
      }
      return false;
    });
    if (!filters || filters.length == 0) throw new Error(`No url ${url} is defined.`);
    request.urlparams = insideParams;
    return {
      request,
      mock: filters[0],
    };
  }

  isExclude(url) {
    for (let i = 0; i < this.exclude.length; i++) {
      const excludeUrl = this.exclude[i];
      if (excludeUrl === url || (excludeUrl instanceof RegExp && excludeUrl.exec(url) !== null)) {
        return true;
      }
    }
    return false;
  }

  fetch(url, options) {
    // using raw fetch while match exclude
    if (this.isExclude(url)) {
      // using raw fetch
      return this.raw(url, options);
    }

    const { request, mock } = this.matchReqUrl(parseRequest(url, options));
    if ('function' !== typeof mock.func) {
      throw new Error('There is no url defined in __mocks__');
    }
    let obj = mock.func(request);

    if (isNull(obj)) {
      throw 'response data should not be undefined or null, it will be an object or an array at least';
    }

    // resolve prue data object
    if (isNull(obj.status)) {
      obj = {
        status: 200,
        data: obj,
      }
    }

    const response = new Response(obj);
    return Promise.resolve(response);
  }
}

export default FetchMock;
export { default as Mock } from 'mockjs';
