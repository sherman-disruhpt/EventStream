import './util/extend.js';
import {eventHandler} from './event/handler.js';
import {mapEvent} from './event/mapper.js';

export default class Store {
  #conversations;
  #archivedConversations;

  constructor() {
    this.#conversations = new Map();
    this.#archivedConversations = new Map();
  }

  /**
   * Gets the list of conversations in reverse chronological order.
   *
   * @returns {Array} The list of conversations.
   */
  get conversations() {
    const conversations = Array.from(this.#conversations, ([key, value]) => value.toJSON());

    return conversations
      .filter((item) => {
        if (item.assignee !== 'John Doe' && item.inbox !== 'private@example.com') {
          return item;
        }
      })
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  }

  /**
   * Handles a conversation_updated event.
   *
   * @param {ArrayBuffer} rawData Data received through the WebSocket.
   */
  handleEvent(rawData) {
    try {
      const data = rawData.toJSON();

      const event = mapEvent(data);

      const conversation = eventHandler({chat: this.#conversations.get(event.id), event});

      if (conversation) {
        if (conversation.isDeleted) {
          this.#archivedConversations.set(conversation.id, conversation);
          this.#conversations.delete(conversation.id, conversation);
        } else {
          this.#conversations.set(conversation.id, conversation);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}
