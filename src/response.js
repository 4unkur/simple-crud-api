class Response {
  static ok(res, data) {
    res.statusCode = 200;
    this.response(res, data);
  }

  static created(res, data) {
    res.statusCode = 201;
    this.response(res, data);
  }

  static notFound(res, message = 'Not Found') {
    res.statusCode = 404;
    this.response(res, message);
  }

  static noContent(res) {
    res.statusCode = 204;
    res.end();
  }

  static error(res, err) {
    res.statusCode = err.code ?? 500;
    this.response(res, err.message ?? 'Something Went Wrong');
  }

  static response(res, data) {
    res.setHeader('Content-Type', 'application/json');
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }
    res.write(data);
    res.end();
  }
}

module.exports = Response;