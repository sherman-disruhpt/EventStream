import Store from './store.js';

const conversationsCount = document.getElementById('conversations-count');

export default class Exercise {
  constructor(socket) {
    this._isPaused = true;
    this._socket = socket;

    const store = new Store();

    this._socket
      .on('conversation_updated', raw => {
        store.handleEvent(raw);
        this._updateConversationsCount(store.conversations);
      })
      .on('end', () => theEnd(store.conversations));
  }

  get isPaused() {
    return Boolean(this._isPaused);
  }

  pause() {
    if (this.isPaused) {
      return;
    }

    this._socket.emit('pause');
    this._isPaused = true;
  }

  resume() {
    if (!this.isPaused) {
      return;
    }

    this._socket.emit('resume');
    this._isPaused = false;
  }

  _updateConversationsCount(conversations) {
    conversationsCount.innerHTML = conversations.length;
  }
}

function theEnd(conversations) {
  console.log('----------------------------------The end.');
  console.log('result:', conversations);
}
