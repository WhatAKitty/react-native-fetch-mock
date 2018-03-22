
const _status = Symbol('status');
const _data = Symbol('data');
const _statusText = Symbol('statusText');

class Response {
  constructor({
    status,
    data = {},
    statusText = '',
  }) {
    this[_status] = status;
    this[_data] = data;
    this[_statusText] = statusText;
  }

  get status() {
    return this[_status];
  }

  get statusText() {
    return this[_statusText];
  }

  get ok() {
    if (this.status >= 200 && this.status < 300) {
      return true;
    } else {
      return false;
    }
  }

  text() {
    try {
      return Promise.resolve(JSON.stringify(this[_data]));
    } catch (err) {
      return Promise.reject(new Error('failed text invoke.'));
    }
  }

  json() {
    return this[_data];
  }

}

export default Response;
