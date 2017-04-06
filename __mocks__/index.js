
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
  }
}
