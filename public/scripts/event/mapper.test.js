import {mapEvent} from './mapper.js';

describe('mapEvent', () => {
  it('Return flatten event object', function () {
    const evt1 = {
      type: 'message',
      data: {
        date: 1529046164737,
        inbox: 'Dessie.Hettinger@example.net',
        subject: 'Concrete Gorgeous Frozen Hat',
        body: 'Dicta consequatur totam sunt.',
        type: 'message',
      },
    };

    const evt2 = mapEvent(evt1);

    expect(evt1.type).toEqual(evt2.type);
    expect(evt1.data.date).toEqual(evt2.date);
    expect(evt1.data.inbox).toEqual(evt2.inbox);
    expect(evt1.data.subject).toEqual(evt2.subject);
    expect(evt1.data.body).toEqual(evt2.body);
    expect(evt1.data.type).toEqual(evt2.type);
  });
});
