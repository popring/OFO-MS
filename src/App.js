import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';


export default class App extends React.Component {
  render() {
    const store = configureStore();

    return (
      <Provider store={store}>
        <div className="App">
          {this.props.children}
        </div>
      </Provider>
    );
  }
}
