import {validate} from './validation.js';
import {EventException, EventTypeException} from './exceptions.js';

describe('EventTypes', () => {
    it('throws an error if event type is invalid', function () {
        const chat = null;
        const event = { type: "test"};
        const eventDataStore = new Map();
        expect(() => validate({chat, event, eventDataStore})).toThrow(EventTypeException);
      });

      it('throws an error if event type is not message and there is no existing chat', function () {
        const chat = null;
        const event = { type: "stop_typing"};
        const eventDataStore = new Map();
        expect(() => validate({chat, event, eventDataStore})).toThrow(EventException);
      });

      it('throws an error if events are out of order', function () {
        const chat = {};
        const event = {id: '1', type: "stop_typing"};
        const eventDataStore = new Map();
        eventDataStore.set('1', [{date: 1529109320536}, {date: 1529072683441}])
        expect(() => validate({chat, event, eventDataStore})).toThrow(EventException);
      });
});