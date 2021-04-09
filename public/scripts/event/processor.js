import Chat from '../chat/chat.js';
import {EventTypes} from './types.js';

export const newMsgEvent = ({chat, event}) => {
  if (!chat) {
    chat = new Chat(event);
  } else {
    chat.newMessage(event);
  }
  return chat;
};

export const typingEvent = ({chat, event}) => {
  if (event.type === EventTypes.START_TYPING) {
    chat.startTyping(event);
  } else if (event.type === EventTypes.STOP_TYPING) {
    chat.stopTyping(event);
  }
  return chat;
};

export const assignmentEvent = ({chat, event}) => {
  if (event.type === EventTypes.ASSIGN) {
    chat.assign(event);
  } else if (event.type === EventTypes.UNASSIGN) {
    chat.unassign(event);
  }
  return chat;
};

export const moveEvent = ({chat, event}) => {
  chat.move(event);
  return chat;
};

export const deleteEvent = ({chat, event}) => {
  chat.delete(event);
  return chat;
};
