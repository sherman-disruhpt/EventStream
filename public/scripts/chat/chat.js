import '../util/extend.js';

export default class Chat {
  #id;
  #assignee;
  #inbox;
  #subject;
  #blurb;
  #messages;
  #updatedAt;
  #repliers;
  #isDeleted;

  constructor({id, subject, inbox, date, body}) {
    this.#assignee = null;
    this.#messages = Array.empty();
    this.#repliers = Array.empty();
    this.#isDeleted = false;
    this.newMessage({id, subject, inbox, date, body});
  }

  get id() {
    return this.#id;
  }

  get subject() {
    return this.#subject;
  }

  get inbox() {
    return this.#inbox;
  }

  get assignee() {
    return this.#assignee;
  }

  get blurb() {
    return this.#blurb;
  }

  get messagesCount() {
    return this.#messages.length;
  }

  get updatedAt() {
    return this.#updatedAt;
  }

  get messages() {
    return this.#messages;
  }

  get isDeleted() {
    return this.#isDeleted;
  }

  newMessage({id, subject, inbox, date, body}) {
    this.#messages.push({id, subject, inbox, date, body});

    const mostRecentMsg = this.#messages.last();
    this.#id = mostRecentMsg.id;
    this.#subject = mostRecentMsg.subject;
    this.#inbox = mostRecentMsg.inbox;
    this._updateDate(mostRecentMsg.date);
    this._updateBlurb();
  }

  assign({user, date}) {
    this.#assignee = user;
    this._updateDate(date);
  }

  unassign({date}) {
    this.#assignee = null;
    this._updateDate(date);
  }

  _updateDate(date) {
    this.#updatedAt = new Date(date);
  }

  _updateBlurb() {
    if (this.#repliers.isEmpty()) {
      this.#blurb = this.#messages.first().body.take(256);
    } else if (this.#repliers.hasOnlyOne()) {
      this.#blurb = `${this.#repliers.first()} is replying...`;
    } else if (this.#repliers.hasMultiple()) {
      this.#blurb = `${this.#repliers.join(', ')} are replying...`;
    }
  }

  startTyping({user, date}) {
    if (!this.#repliers.includes(user)) {
      this.#repliers.push(user);
      this._updateDate(date);
      this._updateBlurb();
    }
  }

  stopTyping({user, date}) {
    this.#repliers = this.#repliers.filter((item) => item !== user);
    this._updateDate(date);
    this._updateBlurb();
  }

  move({inbox, date}) {
    this.#inbox = inbox;
    this._updateDate(date);
  }

  delete({date}) {
    this.#isDeleted = true;
    this._updateDate(date);
  }

  toJSON() {
    return {
      id: this.id,
      subject: this.subject,
      inbox: this.inbox,
      assignee: this.assignee,
      blurb: this.blurb,
      nb_messages: this.messagesCount,
      updated_at: this.#updatedAt.getTime(),
    };
  }
}
