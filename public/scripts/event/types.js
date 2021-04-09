export const EventTypes = Object.freeze({
  MESSAGE: 'message',
  START_TYPING: 'start_typing',
  STOP_TYPING: 'stop_typing',
  ASSIGN: 'assign',
  UNASSIGN: 'unassign',
  MOVE: 'move',
  DELETE: 'delete',
});

export const isEventType = (type) =>
  Object.keys(EventTypes).some((key) => {
    return EventTypes[key] === type;
  });
