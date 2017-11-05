import { Mock } from '../';

export default {
  '/api/users': ({ params }) => {
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
    if ('undefined' !== typeof params) {
      filtered = all.filter(item => {
        let result = true;
        const keys = Object.keys(params);
        keys.forEach(key => {
          const param = params[key];

          if (item[key] && item[key] !== param) {
            result = false;
          }
        });

        return result;
      });
    } else {
      filtered = all;
    }
    return {
      status: 200,
      data: filtered,
    };
  },
  '/api/users/mockjs': ({ params }) => {
    const all = Mock.mock({
      'list|2': [{
        'id|+1': 1,
        'name': '@first @last',
        'age|18-54': 1,
      }]
    }).list;
    let filtered;
    if ('undefined' !== typeof params) {
      filtered = all.filter(item => {
        let result = true;
        const keys = Object.keys(params);
        keys.forEach(key => {
          const param = params[key];

          if (item[key] && item[key] !== param) {
            result = false;
          }
        });

        return result;
      });
    } else {
      filtered = all;
    }
    return {
      status: 200,
      data: filtered,
    };
  },
  '/api/users/{userId}': ({ urlparams }) => {
    return {
      status: 200,
      data: {
        userId: urlparams.userId,
      },
    };
  },
  '/api/users/pru/{userId}': ({ urlparams }) => {
    return {
      userId: urlparams.userId,
    };
  },
  'POST /api/users': () => {
    return {
      status: 201,
    };
  },
  'PUT /api/users/{userId}': ({ urlparams }) => {
    return {
      status: 204,
      data: {
        userId: urlparams.userId,
      },
    };
  }
}
