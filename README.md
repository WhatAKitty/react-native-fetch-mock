# react-native-fetch-mock
[![Build Status](https://travis-ci.org/WhatAKitty/react-native-fetch-mock.svg?branch=master)](https://travis-ci.org/WhatAKitty/react-native-fetch-mock)
[![Known Vulnerabilities](https://snyk.io/test/npm/react-native-fetch-mock/badge.svg)](https://snyk.io/test/npm/react-native-fetch-mock)
[![npm version](https://badge.fury.io/js/react-native-fetch-mock.svg)](https://npmjs.org/package/react-native-fetch-mock)
[![npm downloads](https://img.shields.io/npm/dm/react-native-fetch-mock.svg?style=flat)](https://npmjs.org/package/react-native-fetch-mock)

fetch mock for react-native

[React Version](https://github.com/WhatAKitty/react-fetch-mock)

## Why FetchMock ?
No fetch mock could be used easily for react-native.  
So, I create one by myself.

## Roadmap
- [x] Combined with Mock.js
- [x] Support exclude for some other path
- [x] Proxy for other api server
- [x] Delay for global and specific path
- [x] Support flexible fallback to network([#6](https://github.com/WhatAKitty/react-native-fetch-mock/issues/6))
- [ ] Support inline valiation(such as: '/api/users/{userid:[a-z|A-Z]}')

## Usage

__ mocks__/index.js
```
export default {
  '/api/path': ({ method, url, params, urlparams, headers }) => {
    const all = Mock.mock({
      'list|2': [{
        'id|+1': 1,
        'name': '@first @last',
        'age|18-54': 1,
      }]
    }).list;
    return all;   // default status is 200
  },
  '/api/path/{id}': ({ method, url, params, urlparams, headers }) => {
    const all = Mock.mock({
      'list|2': [{
        'id|+1': 1,
        'name': '@first @last',
        'age|18-54': 1,
        'urlid': urlparams.id,
      }]
    }).list;
    return all;
  },
  'POST /api/path': ({ method, url, params, urlparams, headers }) => {
    return {
      status: 201,
    };
  },
  'PUT /api/path/${id}': ({ method, url, params, urlparams, headers }) => {
    return {
      status: 204,
      id: urlparams.id,
    };
  },
}
```
index.js
```
import FetchMock from 'react-native-fetch-mock';

if (__dev__) {
  global.fetch = new FetchMock(require('path/to/mocks/directory'), {
    delay: 200, // 200ms
    fetch: global.fetch,
    exclude: [
      'http://www.google.com',
      '/foo(.*)',
    ],
    fallbackToNetwork: true,  // ['true', 'false', 'always'], true: Unhandled calls fall through to the network;false: Unhandled calls throw an error; 'always': All calls fall through to the network, effectively disabling react-native-fetch-mock
    proxy: [{
      path: '/path/for/proxy(.*)',
      target: 'http://other.proxy.server',
      process: (proxied, matches) => {
        return `${proxied.target}${matches[1]}`,
      },
    }],
  }).fetch;
}

// if __dev__ is true, it will back the data you defined in mock directory
fetch('/api/path', options);
fetch('/api/path', {
  delay: 2000,      // /api/path will delayed after 2000ms. Most of suitation, this won't be used usually.
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John',
  }),
});
fetch('/api/path/123', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John2',
  }),
});
```

## Example Runing

```
git clone git@github.com:WhatAKitty/react-native-fetch-mock.git
cd react-native-fetch-mock/example/Basic
npm install (attention: don't use yarn while install example dep)
react-native run-ios
```

## LICENSE

MIT
