const events = require('./storage/events.json');

module.exports = class Storage {
  constructor(socket) {
    this.id = socket.id;
    this._events = [...events];
    this._timeout = null;
    this._isStreaming = false;
    this._socket = socket;

    this._log('Connected.');

    this._socket.on('disconnecting', () => {
      if (!this._isStreaming || !this._timeout) {
        return;
      }

      clearTimeout(this._timeout);
      this._log('Streaming cancelled.');
    });
  }

  pause() {
    this._isStreaming = false;
    clearTimeout(this._timeout);
  }

  stream() {
    this._isStreaming = true;
    const event = this._events.shift();

    if (!event) {
      this._log('No more events to stream.');
      this._isStreaming = false;
      this._socket.emit('end');

      return;
    }

    const timeout = Math.floor(Math.random() * 1000);

    this._log(`Emitting event ${event.type}. Next event in ${timeout} ms.`);
    this._socket.emit('conversation_updated', Buffer.from(JSON.stringify(event)));

    this._isStreaming = true;
    this._timeout = setTimeout(() => this.stream(), timeout);
  }

  _log(message) {
    console.log(`[${this.id}] ${message}`);
  }
};
