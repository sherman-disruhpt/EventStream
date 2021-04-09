import '../util/extend.js';
import {EventTypes, isEventType} from './types.js';
import {EventException, EventTypeException} from './exceptions.js';

export const validate = ({chat, event, eventDataStore}) => {
  if (!isEventType(event.type)) {
    throw new EventTypeException(`Event type: ${event.type} is invalid`);
  }

  if (!chat && event.type !== EventTypes.MESSAGE) {
    throw new EventException(
      `Cannot process event type: ${event.type} because the existing chat ${event.id} does not exist`
    );
  }

  const events = eventDataStore.get(event.id);

  if (events.hasMultiple()) {
   
    const lastEvent = eventDataStore.get(event.id).last();
    const penultimateEvent = eventDataStore.get(event.id).penultimate();
    const lastTimestamp = new Date(lastEvent.date);
    const penultimateTimestamp = new Date(penultimateEvent.date);

    if (lastTimestamp < penultimateTimestamp) {
      throw new EventException(`Incoming event type ${event.type} for chat ${event.id} is out of order`);
    }
  }
};
