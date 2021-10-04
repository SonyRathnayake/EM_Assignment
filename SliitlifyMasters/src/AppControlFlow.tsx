import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import Toast from './components/Toast';
import { toastRef } from './util/action';
import LoginScene from './LoginScene';

const AppControlFlow: React.FC = () => {
  const [user, setUser] = React.useState(null);
  return (
    <>
      {user ? (
        <NavigationContainer>
          <AppNavigator setUser={setUser} />
        </NavigationContainer>
      ) : (
        <LoginScene setUser={setUser} />
      )}
      <Toast {...{ ref: toastRef }} />
    </>
  );
};

export default AppControlFlow;
