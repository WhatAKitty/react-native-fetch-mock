import { Mock } from '../';

export default {
  '/api/users': async (options) => {
    const all = [
      {
        name: 'John',
        age: 15,
      },
      {
        name: 'Lily',
        age: 16,
      }
    ];
    let filtered;
    if ('undefined' !== typeof options) {
      filtered = all.filter(item => {
        let result = true;
        const keys = Object.keys(options);
        keys.forEach(key => {
          const option = options[key];

          if (item[key] && item[key] !== option) {
            result = false;
          }
        });
        
        return result;
      });
    } else {
      filtered = all;
    }
    return {
      data: filtered,
    }
  },
  '/api/users/mockjs': async (options) => {
    const all = Mock.mock({
      'list|2': [{
        'id|+1': 1,
        'name': '@first @last',
        'age|18-54': 1,
      }]
    }).list;
    let filtered;
    if ('undefined' !== typeof options) {
      filtered = all.filter(item => {
        let result = true;
        const keys = Object.keys(options);
        keys.forEach(key => {
          const option = options[key];

          if (item[key] && item[key] !== option) {
            result = false;
          }
        });
        
        return result;
      });
    } else {
      filtered = all;
    }
    return {
      data: filtered,
    }
  }
}
