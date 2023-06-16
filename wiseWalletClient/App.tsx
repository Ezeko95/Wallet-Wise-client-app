import React from 'react';

import Navigator from './src/Navigation/HomeStack'
import { Provider } from 'react-redux';
import {store} from "./src/redux/store";

function App(): JSX.Element {
  return (
  <Provider store={store}>
    <Navigator/>
  </Provider>
  );
}


export default App;
