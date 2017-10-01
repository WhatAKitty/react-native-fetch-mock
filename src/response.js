
class Response {
  constructor({
    status,
    data = {},
    statusText = '',
  }) {
    this.status = status;
    this.data = data;
    this.statusText = statusText;
  }

  text() {
    try {
      return Promise.resolve(JSON.stringify(data));
    } catch (err) {
      return Promise.reject(new Errror('failed text invoke.'));
    }
  }

  json() {
    return this.data;
  }

}

export default Response;
