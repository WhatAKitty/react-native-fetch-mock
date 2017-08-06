# react-native-fetch-mock
[![Build Status](https://travis-ci.org/WhatAKitty/react-native-fetch-mock.svg?branch=master)](https://travis-ci.org/WhatAKitty/react-native-fetch-mock)
[![Known Vulnerabilities](https://snyk.io/test/npm/react-native-fetch-mock/badge.svg)](https://snyk.io/test/npm/react-native-fetch-mock)

fetch mock for react-native

## Why FetchMock ?
No fetch mock could be used easily for react-native.  
So, I create one by myself.

## Roadmap
- [x] Combined with Mock.js

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
    return {
      status: 200,
      data: all,
    };
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
    return {
      status: 200,
      data: all,
    };
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
  global.fetch = new FetchMock(require('path/to/mocks/directory')).fetch;
}

// if __dev__ is true, it will back the data you defined in mock directory
fetch('/api/path', options);
fetch('/api/path', {
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
## LICENSE

MIT
