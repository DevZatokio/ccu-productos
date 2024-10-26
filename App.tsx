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
  user: null,
  isLoading: true,
};
// reducer initialState
const reducer = (prev: any, action: any) => {
  switch (action.type) {
    case 'RESTORE_USER':
      return {
        ...prev,
        user: action.user,
        isLoading: false,
      };
    case 'SIGN_OUT':
      return {
        ...prev,
        user: null,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prev,
        user: action.user,
        isLoading: false,
      };
    default:
      return {
        user: action.user,
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
    dispatch({type: null, user: null, isLoading: true});
    try {
      const user = await Storage.getUser();

      if (user != null) {
        dispatch({type: 'RESTORE_USER', user: user, isLoading: false});
      } else {
        dispatch({type: 'RESTORE_USER', user: null, isLoading: false});
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
      signIn: async (data: any) => {
        // subscribe general users users:_id
        try {
          console.log('users' + data._id);
          await Storage.setUser(data);
          dispatch({type: 'SIGN_IN', user: data, isLoading: false});
        } catch (error) {
          console.log(error);
        }
      },
      signOut: async () => {
        // unsubscribe general users users:_id
        const user = await Storage.getUser();

        if (user != null) {
          await Storage.clear();
          dispatch({type: 'SIGN_OUT', user: null, isLoading: false});
        }
      },
      signUp: async (data: any) => {
        dispatch({type: 'SIGN_UP', user: data, isLoading: false});
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
            ) : status.user ? (
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
