import React from 'react';
import {View} from 'react-native';
import AuthNavigation from './src/navigations/AuthNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/navigations/rootNavigation';

export default App = () => {
  return (
    <View style={{flex: 1}}>
      <NavigationContainer ref={navigationRef}>
        <AuthNavigation />
      </NavigationContainer>
    </View>
  );
};
