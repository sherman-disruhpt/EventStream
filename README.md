## Introduction

This exercise is about how to handle a stream of data to keep the state of an application up to date.

## Instructions

To run the exercise:
1. Install the project dependencies with `npm install`.
2. Run the server with `npm start`.
3. Open the front-end application by going to [http://localhost:8080](http://localhost:8080)

The project contains a web server serving a front-end client application.
When started, the application will connect to the web server via websocket using [socket.io](https://socket.io/).

The application starts with an empty array of conversations (see `public/scripts/store.js`) that will be updated by real-time events received over websocket.
The goal is to consume those events to keep the array of conversations up to date. 

## Specifications

The server will emit `conversation_updated` events to the client that are handled by the method `handleEvent` in `public/scripts/store.js`.

**Important:** the server can potentially emit invalid events, duplicate events, or events that are out of order (happened in the past). 

Once all the events have been handled, the application will automatically log the array of conversations.

### Events

An event is emitted by the server as a buffer of a UTF-8-encoded and JSON-stringified object with the following properties:

| Property               | Type              | Description                       |
|------------------------|-------------------|-----------------------------------|
| `type`                 | String            | Event type                        |
| `data`                 | Object            | Event data                        |
| `data.date`            | Integer           | Timestamp (in ms) of the event    |
| `data.conversation_id` | String            | ID of the conversation            |
| `data.user`            | String (optional) | User related to the event         |
| `data.inbox`           | String (optional) | Inbox of the conversation         |
| `data.subject`         | String (optional) | Subject of the message            |
| `data.body`            | String (optional) | Body of the message               |

Depending on its type, an event needs to be handled differently:
* `delete` should delete the conversation.
* `assign` should assign the conversation to the specified user.
* `unassign` should set the conversation assignee to `null`.
* `move` should update the inbox of the conversation.
* `start_typing` should add the user as typing.
* `stop_typing` should remove the user as typing.
* `message` should update the existing conversation or create a new one if it does not exist.

### Conversations list

Each conversation in the array should be a simple javascript object that looks like this:
```
{
    id: 'b7050be8-9bf7-46b7-8baf-3346fa0109b7',
    assignee: null,
    inbox: 'email@example.com',
    subject: 'No subject',
    blurb: 'Jane is replying...',
    nb_messages: 42,
    updated_at: 1528321736468
}
```

* The `assignee` property is a nullable string containing the user to which the conversation is assigned to.
* The `inbox` property is a string containing the inbox in which the conversation is.
* The `subject` property is a string containing the subject of the most recent message.
* The `blurb` property is a string containing:
    * the **first 256 characters of the oldest message** or
    * the string `${user} is replying...` if one user is typing or
    * the string `${user1}, ${user2} are replying...` if more than one user is typing
* The `nb_messages` property is the number of messages in the conversation
* The `updated_at` property is the timestamp in millisecond of the most recent event received.

