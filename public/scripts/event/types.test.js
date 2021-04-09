import {EventTypes, isEventType} from './types.js';

describe('EventTypes', () => {
    it('Return if EventType exist', function () {
      expect(isEventType('test')).toBeFalsy();
      expect(isEventType('message')).toBeTruthy();
      expect(isEventType('start_typing')).toBeTruthy();
      expect(isEventType('stop_typing')).toBeTruthy();
      expect(isEventType('assign')).toBeTruthy();
      expect(isEventType('unassign')).toBeTruthy();
      expect(isEventType('move')).toBeTruthy();
      expect(isEventType('delete')).toBeTruthy();
    });

    it('throws an error if EventTypes values are changed', function () {
        expect(() => EventTypes.MOVE = 'test').toThrow();
        expect(() => EventTypes.DELETE = 'test').toThrow();
        expect(() => EventTypes.ASSIGN = 'test').toThrow();
        expect(() => EventTypes.UNASSIGN = 'test').toThrow();
        expect(() => EventTypes.STOP_TYPING = 'test').toThrow();
        expect(() => EventTypes.START_TYPING = 'test').toThrow();
        expect(() => EventTypes.MESSAGE = 'test').toThrow();
      });
});