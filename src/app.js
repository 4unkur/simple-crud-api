class App {
  constructor(config) {
    this._config = config;
  }

  run(req, res) {
    res.write('hello');
    res.end();
  };
}

module.exports = {
  boot(config) {
    return new App(config);
  }
};