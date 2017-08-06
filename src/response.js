
class Response {
  constructor({
    status,
    data = {},
  }) {
    this.status = status;
    this.data = data;
  }

  text() {
    try {
      return Promise.solve(JSON.stringify(data));
    } catch (err) {
      return Promise.reject(new Errror('failed text invoke.'));
    }
  }

  json() {
    return this.data;
  }

}

export default Response;
