class ConfigService {
  constructor() {
    this.loaded = false;
    this.config = {};
    this.loadListeners = [];
  }
  setConfig(config) {
    this.loaded = true;
    this.config = config;
    for (let l of this.loadListeners) {
      l();
    }
  }
  getConfig() {
    return this.config;
  }
  isLoaded() {
    return this.loaded;
  }
  addLoadListener(l) {
    this.loadListeners.push(l);
  }
}

export default new ConfigService();
