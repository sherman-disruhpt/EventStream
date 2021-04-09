import {eventHandler} from './handler.js';

describe('eventHandler', () => {
  const id = '3a313452-0eb3-435e-8f6b-3671c593f2d9';
  const lastUpdateDate = 1529046378908;
  const inbox = 'Dessie.Hettinger@example.net';
  const subject = 'Concrete Gorgeous Frozen Hat';
  const type1 = 'Mr. Cristina Smitham';
  const type2 = 'Mr. Angelina Satterfield';
  const type3 = 'Lincoln Batz PhD';

  const outOfOrderEvents = [
    {
      id,
      date: 1529046315398,
      user: type1,
      type: 'start_typing',
    },
    {
      id,
      date: 1529046235234,
      user: type2,
      type: 'start_typing',
    },
    {
      id,
      date: lastUpdateDate,
      user: type3,
      type: 'start_typing',
    },
    {
      id,
      date: 1529046164737,
      inbox,
      subject,
      body: 'Dicta consequatur totam sunt.',
      type: 'message',
    },
  ];

  it('Should correct out of order events', function () {
    let chat = null;
    for (const event of outOfOrderEvents) {
      chat = eventHandler({chat, event});
    }

    const json = chat.toJSON();
    expect(json.id).toEqual(id);
    expect(json.updated_at).toEqual(lastUpdateDate);
    expect(json.inbox).toEqual(inbox);
    expect(json.subject).toEqual(subject);
    expect(json.blurb).toEqual(`${type2}, ${type1}, ${type3} are replying...`);
    expect(json.nb_messages).toEqual(1);
    expect(json.assignee).toEqual(null);
  });
});
