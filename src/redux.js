import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { logger } from 'redux-logger';

// middlewere


const createId = () => Date.now();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const books = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {

    case "ADD_BOOK":
      return [...state, { id: createId(), title: payload }]

    case "UPDATE_BOOK":
      return state.map(item => {
        if (item.id === payload.id) return { ...item, title: payload.bookName };
        return item;
        });

    case "REMOVE_BOOK":
      return state.filter(book => book.id !== payload)
      
    default:
      return state;
  }
};

const readers = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_READER":
      return  [...state, { id: createId(), title: payload }]
    case "UPDATE_READER":
      return  state.map(item => {
          if (item.id === payload.id) return { ...item, title: payload.bookName };
          return item;
      });
    
    case "REMOVE_READER":
      return state.filter(book => book.id !== payload);

    default:
      return state;
  }
};


const reducer = combineReducers ({
  books,
  readers,
}); 


const initialState = {
  books: [],
  readers: [],
}

const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(logger)));

const addBook = bookName => ({ type: "ADD_BOOK", payload: bookName });
const removeBook = bookName => ({ type: "REMOVE_BOOK", payload: bookName });
const updateBook = (id, bookName) => ({
  type: "UPDATE_BOOK",
  payload: { id, bookName }
});

const addReader = readerName => ({ type: "ADD_READER", payload: readerName });
const removeReader = readerName => ({ type: "REMOVE_READER", payload: readerName });
const updateReader = (id, readerName) => ({
  type: "UPDATE_READER",
  payload: { id, readerName }
});

store.subscribe(() => {
  console.log("From subscribe", store.getState());
});

store.dispatch(addBook("sdfsdf"));
store.dispatch(addBook("ertertert"));
store.dispatch(updateBook(store.getState().books[0].id, "Book1"));
store.dispatch(removeBook(store.getState().books[0].id));


console.log ('---addReaders');


console.log('---- add reader');
store.dispatch(addReader('Reader 1'));