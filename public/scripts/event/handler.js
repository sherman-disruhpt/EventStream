import '../util/extend.js';
import {EventTypes} from './types.js';
import {EventException, EventTypeException} from './exceptions.js';
import {validate} from './validation.js';
import * as process from './processor.js';

const eventDataStore = new Map();

const outOfOrderProcessing = (id) => {
  eventDataStore.sort(id, (a, b) => new Date(a.date) - new Date(b.date));
  const events = eventDataStore.get(id);
 
  if (events.hasMultiple()) {
    if (events.first().type === EventTypes.MESSAGE) {
      eventDataStore.set(id, Array.empty());
      let chat = null;
      for (const evt of events) {
        chat = eventHandler({chat, event: evt});
      }
      return chat;
    }
  }
};

export const eventHandler = ({chat, event}) => {
  try {
    eventDataStore.append(event.id, event);
   
    validate({chat, event, eventDataStore});

    switch (event.type) {
      case EventTypes.MESSAGE:
        return process.newMsgEvent({chat, event});
      case EventTypes.START_TYPING:
      case EventTypes.STOP_TYPING:
        return process.typingEvent({chat, event});
      case EventTypes.ASSIGN:
      case EventTypes.UNASSIGN:
        return process.assignmentEvent({chat, event});
      case EventTypes.MOVE:
        return process.moveEvent({chat, event});
      case EventTypes.DELETE:
        return process.deleteEvent({chat, event});
    }
  } catch (err) {
    if (err instanceof EventTypeException) {
      return chat;
    } else if (err instanceof EventException) {
      return outOfOrderProcessing(event.id);
    } else {
      throw err;
    }
  }
};
