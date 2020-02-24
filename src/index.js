import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppNavigator } from './app/actions/navigator';
import NavigatorService from './app/services/navigator';

import Store from './app/store';

const store = Store;

// eslint-disable-next-line no-console
console.disableYellowBox = true;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    NavigatorService.setContainer(store);
  }

  render() {
    return (
      <StoreProvider store={store}>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </StoreProvider>
    );
  }
}
