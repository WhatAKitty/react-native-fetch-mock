# react-native-fetch-mock
[![Build Status](https://travis-ci.org/WhatAKitty/react-native-fetch-mock.svg?branch=master)](https://travis-ci.org/WhatAKitty/react-native-fetch-mock)

fetch mock for react-native

## Why FetchMock ?
No fetch mock could be used easily for react-native.  
So, I create one by myself.

## Roadmap
- [x] Combined with Mock.js

## Usage
```
import FetchMock from 'react-native-fetch-mock';

if (__dev__) {
  global.fetch = FetchMock(require('path/to/mocks/directory'));
}

// if __dev__ is true, it will back the data you defined in mock directory
fetch('/api/path', options);
```
## LICENSE

MIT
