import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import Toast from '../components/Toast';
import { toastRef } from '../util/action';
import LoginScene from '../pages/LoginScene';
import { NameProvider } from '../context/NameContext';
import { MsProvider } from '../context/MSnoContext';
import { UserProvider } from '../context/UserContext';
const AppControlFlow: React.FC = () => {
  const [user, setUser] = React.useState(null);
  //const { user, setUser } = useUser(); //Madush
  return (
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
  );
};

export default AppControlFlow;
