
class FetchMock {
  constructor(mockdir) {
    if ('string' !== typeof mockdir) {
      throw new Error('There is no mockdir defined.');
    }

    this.urls = [];
    this.loadMocks = this.loadMocks.bind(this);
    this.loadMock = this.loadMock.bind(this);
    this.fetch = this.fetch.bind(this);

    this.loadMocks(mockdir);
  }

  loadMocks(mockdir) {
    const __mocks__ = require(mockdir).default;
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

  async fetch(url, options) {
    const filters = this.urls.filter(url => url === url);
    if (!filters || filters.length == 0) throw new Error(`No url ${url} is defined.`);
    const mock = filters[0];
    if ('function' !== typeof mock.func) {
      throw new Error('There is no url defined in __mocks__');
    }
    return await mock.func(options);
  }
}

export default FetchMock;
