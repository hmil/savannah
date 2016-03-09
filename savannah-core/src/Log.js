
class DefaultBackend {
  debug(msg) {
    console.log('[debug] ' + msg);
  }

  info(msg) {
    console.log('[info] ' + msg);
  }

  warn(msg) {
    console.error('[warn] ' + msg);
  }

  error(msg) {
    console.error('[err] ' + msg);
  }
}

export class VoidBackend {
  debug() {}
  info() {}
  warn() {}
  error() {}
}

export const Log = {

  _logger: new DefaultBackend(),

  setBackend: (logger) => {
    this._logger = logger;
  },

  debug: function(msg) {
    this._logger.debug(msg);
  },

  info: function(msg) {
    this._logger.info(msg);
  },

  warn: function(msg) {
   this._logger.warn(msg);
 },

 error: function(msg) {
    this._logger.error(msg);
  }
};
