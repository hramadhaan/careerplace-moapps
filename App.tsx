import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {AppNavigation} from './src/routes/AppNavigation';

interface Props {}

const App: React.FC<Props> = props => {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
};

export default App;
