import { CREATE_CHAT, CREATE_GROUP, GET_ALL_CHAT, DELETE_GROUP } from "./ActionType";

const initialValue = {
  chats: [],
  createdGroup: null,
  createdChat: null,
};

export const chatReducer = (state = initialValue, { type, payload }) => {
  switch (type) {
    case CREATE_CHAT:
      return { ...state, createdChat: payload };

    case CREATE_GROUP:
      return { ...state, createdGroup: payload };

    case GET_ALL_CHAT:
      return { ...state, chats: payload };

    case DELETE_GROUP:
          return {
            ...state,
            chats: state.chats.filter((chat) => (chat.group && chat.id !== payload) || !chat.group),
            deletedGroupId: payload,
          };

    default:
      return state;
  }
};
