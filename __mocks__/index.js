
export default {
  '/api/users': async () => {
    return {
      data: [
        {
          name: 'John',
          age: 15,
        },
        {
          name: 'Lily',
          age: 16,
        }
      ]
    }
  }
}
