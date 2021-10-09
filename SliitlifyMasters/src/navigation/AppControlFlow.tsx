import React from 'react';
import AppNavigator from './AppNavigator';
import LoginScene from '../pages/LoginScene';
import Toast from '../components/Toast';
import { toastRef } from '../util/action';
import { NavigationContainer } from '@react-navigation/native';
import { NameProvider } from '../context/NameContext';
import { MsProvider } from '../context/MSnoContext';
import { UserProvider } from '../context/UserContext';
import { NetworkProvider } from 'react-native-offline';
NetworkProvider;
const AppControlFlow: React.FC = () => {
  const [user, setUser] = React.useState(null);
  return (
    <NetworkProvider>
      <UserProvider>
        <MsProvider>
          <NameProvider>
            {user ? (
              <NavigationContainer>
                <AppNavigator setUser={setUser} />
              </NavigationContainer>
            ) : (
              <LoginScene setUser={setUser} />
            )}
            <Toast {...{ ref: toastRef }} />
          </NameProvider>
        </MsProvider>
      </UserProvider>
    </NetworkProvider>
  );
};

export default AppControlFlow;
