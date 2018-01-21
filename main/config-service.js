class ConfigService {
  constructor() {
    this.loaded = false;
    this.config = {};
  }
  setConfig(config) {
    this.loaded = true;
    this.config = config;
  }
  getConfig() {
    return this.config;
  }
  isLoaded() {
    return this.loaded;
  }
}

export default new ConfigService();
