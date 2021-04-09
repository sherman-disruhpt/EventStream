export const mapEvent = (event) => {
    const id = event.data.conversation_id;
    const data = event.data;
    delete data.conversation_id;
    data.type = event.type;
  
    return {
      id,
      ...data,
    };
  };