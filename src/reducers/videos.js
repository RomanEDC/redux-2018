const ADD_VIDEO = 'ADD_VIDEO';
const EDIT_VIDEO = 'EDIT_VIDEO';
const REMOVE_VIDEO = 'REMOVE_VIDEO';

const INIT = [];

export default function videosReducer(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_VIDEO:
      const newItem = {
        id: Date.now(),
        title: payload.title,
        url: payload.url,
        tags: payload.tags,
      };
      return [newItem, ...state];

    case REMOVE_VIDEO:
      return state.filter(item =>
        payload.id !== item.id
      );
    case EDIT_VIDEO:
      return state.map(item => {
        if (item.id === payload.id) {
          return {
            ...item,
            title: payload.title,
            tags: payload.newTags
          };
        }
        return item;
      });

    default:
      return state;
  }
}

export const addVideo = ({ title, url, tags }) => ({
  type: ADD_VIDEO,
  payload: { title, url, tags },
});

export const removeVideo = id => ({
  type: REMOVE_VIDEO,
  payload: { id },
});

export const editVideo = (id, title, tags) => ({
  type: EDIT_VIDEO,
  payload: { id, title, tags },
});
