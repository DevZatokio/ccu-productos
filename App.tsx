import {useEffect, useMemo, useReducer} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//redux
import {Provider} from 'react-redux';
import {persist, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

// storage
import Storage from './src/utils/Storage';

// configs
import {AuthContext} from './src/contexts/AuthContext';


// pages
import Login from './src/pages/Login/Login';
import LoadingInit from './src/pages/Loading/LoadingInit';
import Dashboard from './src/pages/Dashboard/Dashboard';

// init initialState
const initialState = {
  type: null,
  token: null,
  isLoading: true,
};
// reducer initialState
const reducer = (prev: any, action: any) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prev,
        token: action.token,
        isLoading: false,
      };
    case 'SIGN_OUT':
      return {
        ...prev,
        token: null,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prev,
        token: action.token,
        isLoading: false,
      };
    default:
      return {
        token: action.token,
        isLoading: true,
      };
  }
};

const Stack = createNativeStackNavigator();

import {navigationRef} from './src/utils/NavigationRoot';
import React from 'react';

function App() {

  useEffect(() => {
    AppState.addEventListener('change', async (status: AppStateStatus) => {
      console.log('App status: ', 'change', status);
    });
    AppState.addEventListener('blur', async (status: AppStateStatus) => {
      console.log('App status: ', 'blur', status);
    });
    AppState.addEventListener('focus', async (status: AppStateStatus) => {
      console.log('App status: ', 'focus', status);
    });
    AppState.addEventListener(
      'memoryWarning',
      async (status: AppStateStatus) => {
        console.log('App status: ', 'memoryWarning', status);
      },
    );
    (async () => {
      bootstrapAsync();
    })();
  }, []);

  const bootstrapAsync = async () => {
    dispatch({type: null, token: null, isLoading: true});
    try {
      const token = await Storage.getToken();
      console.log('bootstrapAsync token: ', token);
      if (token != null) {
        dispatch({type: 'RESTORE_TOKEN', token: token, isLoading: false});
      } else {
        dispatch({type: 'RESTORE_TOKEN', token: null, isLoading: false});
      }
    } catch (e: any) {
      console.log('================');
      console.log('bootstrapAsync error: ', e);
      // Restoring token failed
      if (e.response && e.response.status === 400) {
        await authContext.signOut();
      }
    }
  };

  const [status, dispatch] = useReducer(reducer, initialState);

  const authContext = useMemo(
    () => ({
      signIn: async (token: any) => {
        // subscribe general users users:_id
        try {
          await Storage.setToken(token);
          dispatch({type: 'SIGN_IN', token: token, isLoading: false});
        } catch (error) {
          console.log(error);
        }
      },
      signOut: async () => {
        // unsubscribe general users users:_id
        const token = await Storage.getToken();

        if (token != null) {
          await Storage.clear();
          dispatch({type: 'SIGN_OUT', token: null, isLoading: false});
        }
      },
      signUp: async (data: any) => {
        dispatch({type: 'SIGN_UP', token: data, isLoading: false});
      },
    }),
    [],
  );

  return (
    <Provider store={store}>
      <PersistGate persistor={persist}>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer ref={navigationRef}>
            {status.isLoading ? (
              <LoadingInit />
            ) : status.token ? (
              <DashboardApp />
            ) : (
              <RootApp />
            )}
          </NavigationContainer>
        </AuthContext.Provider>
      </PersistGate>
    </Provider>
  );
}

// stack navigation
const RootApp = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{title: 'Inicio Sesión', headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const DashboardApp = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default App;
