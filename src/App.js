import React, { Component } from 'react';
import { Provider } from 'react-redux';

import './App.css';
import Form from './containers/Form';
import List from './containers/List';
import Search from './containers/Search';

import storeCreator from './store';

const store = storeCreator();

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <div className="App">
            search by title: <Search searchField="title" />
            search by tags: <Search searchField="tags" />
                <Form />
                <List />
            </div>
        </Provider>
    );
  }
}

export default App;