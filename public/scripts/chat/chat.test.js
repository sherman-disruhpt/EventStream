import Chat from './chat.js';

describe('Chat', () => {
  const newMsg = {
    id: '3a313452-0eb3-435e-8f6b-3671c593f2d9',
    date: 1529046164737,
    inbox: 'Dessie.Hettinger@example.net',
    subject: 'Concrete Gorgeous Frozen Hat',
    body: 'Dicta consequatur totam sunt.',
    type: 'message',
  };

  it('Should add initialize on create', function () {
    const chat = new Chat(newMsg);
    expect(chat.assignee).toEqual(null);
    expect(chat.blurb).toEqual(newMsg.body);
    expect(chat.isDeleted).toBeFalsy();
    expect(chat.messages[0].id).toEqual(newMsg.id);
    expect(chat.messages[0].date).toEqual(newMsg.date);
    expect(chat.messages[0].inbox).toEqual(newMsg.inbox);
    expect(chat.messages[0].subject).toEqual(newMsg.subject);
    expect(chat.messages[0].body).toEqual(newMsg.body);
    expect(chat.messages[0].hasOwnProperty('type')).toBeFalsy();
  });

  it('Should add new message', function () {
    const chat = new Chat(newMsg);

    const newMsg2 = {
      id: newMsg.id,
      date: 1529072683441,
      inbox: newMsg.inbox,
      subject: 'RE Concrete Gorgeous Frozen Hat',
      body: 'totam sunt.',
      type: 'message',
    };

    chat.newMessage(newMsg2);
    expect(chat.id).toEqual(newMsg2.id);
    expect(chat.updatedAt).toEqual(new Date(newMsg2.date));
    expect(chat.inbox).toEqual(newMsg2.inbox);
    expect(chat.subject).toEqual(newMsg2.subject);
    expect(chat.blurb).toEqual(newMsg.body);
    expect(chat.messagesCount).toEqual(2);
    expect(chat.isDeleted).toBeFalsy();
    expect(chat.messages[1].hasOwnProperty('type')).toBeFalsy();
  });

  it('Should add assign a user', function () {
    const chat = new Chat(newMsg);
    const obj = {user: 'Jane', date: 1529072683441};
    expect(chat.assignee).toEqual(null);
    chat.assign(obj);
    expect(chat.assignee).toEqual(obj.user);
    expect(chat.updatedAt).toEqual(new Date(obj.date));
  });

  it('Should add unassign a user', function () {
    const chat = new Chat(newMsg);
    const obj = {user: 'Jane', date: 1529072683441};
    const obj2 = {date: 1529075775462};
    chat.assign(obj);
    expect(chat.assignee).toEqual(obj.user);
    chat.unassign(obj2);
    expect(chat.assignee).toEqual(null);
    expect(chat.updatedAt).toEqual(new Date(obj2.date));
  });

  it('Should add typer', function () {
    const chat = new Chat(newMsg);
    const obj = {
      id: newMsg.id,
      date: 1529046235234,
      user: 'Mr. Angelina Satterfield',
      type: 'start_typing',
    };

    const obj2 = {
      id: newMsg.id,
      date: 1529046760747,
      user: 'Mr. Stark',
      type: 'start_typing',
    };

    chat.startTyping(obj);
    expect(chat.blurb).toEqual(`${obj.user} is replying...`);
    expect(chat.updatedAt).toEqual(new Date(obj.date));

    chat.startTyping(obj2);
    expect(chat.blurb).toEqual(`${obj.user}, ${obj2.user} are replying...`);
    expect(chat.updatedAt).toEqual(new Date(obj2.date));
  });

  it('Should remove typer', function () {
    const chat = new Chat(newMsg);
    const obj = {
      id: newMsg.id,
      date: 1529046235234,
      user: 'Mr. Angelina Satterfield',
      type: 'start_typing',
    };

    const obj2 = {
      id: newMsg.id,
      date: 1529046760747,
      user: 'Mr. Stark',
      type: 'start_typing',
    };

    const obj3 = {
      id: newMsg.id,
      date: 1529033102132,
      user: 'Mr. Stark',
      type: 'stop_typing',
    };

    const obj4 = {
      id: newMsg.id,
      date: 1529082388731,
      user: 'Mr. Angelina Satterfield',
      type: 'stop_typing',
    };

    chat.startTyping(obj);
    chat.startTyping(obj2);
    expect(chat.blurb).toEqual(`${obj.user}, ${obj2.user} are replying...`);
    expect(chat.updatedAt).toEqual(new Date(obj2.date));

    chat.stopTyping(obj3);
    expect(chat.blurb).toEqual(`${obj.user} is replying...`);
    expect(chat.updatedAt).toEqual(new Date(obj3.date));

    chat.stopTyping(obj4);
    expect(chat.blurb).toEqual(newMsg.body);
    expect(chat.updatedAt).toEqual(new Date(obj4.date));
  });

  it('Should move inbox', function () {
    const chat = new Chat(newMsg);
    const obj = {
      id: newMsg.id,
      date: 1529077576392,
      inbox: 'Bartholome3@example.net',
    };
    expect(chat.inbox).toEqual(newMsg.inbox);
    chat.move(obj);
    expect(chat.inbox).toEqual(obj.inbox);
    expect(chat.updatedAt).toEqual(new Date(obj.date));
  });

  it('Should mark for deletion', function () {
    const chat = new Chat(newMsg);
    const obj = {
      id: newMsg.id,
      date: 1529095568364,
    };
    expect(chat.isDeleted).toBeFalsy();
    chat.delete(obj);
    expect(chat.isDeleted).toBeTruthy();
    expect(chat.updatedAt).toEqual(new Date(obj.date));
  });

  it('Should return json object', function () {
    const chat = new Chat(newMsg);
    const json = chat.toJSON();
    expect(json.id).toEqual(newMsg.id);
    expect(json.updated_at).toEqual(newMsg.date);
    expect(json.inbox).toEqual(newMsg.inbox);
    expect(json.subject).toEqual(newMsg.subject);
    expect(json.blurb).toEqual(newMsg.body);
    expect(json.nb_messages).toEqual(1);
    expect(json.assignee).toEqual(null);
  });
});
