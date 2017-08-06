
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
  }
}
