import {useContext, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomText from '../../components/CustomText';
import Axios from '../../utils/Axios';
import { ImageCCU } from '../../images';
import { ColorsTheme } from '../../configs';
import { AuthContext } from '../../contexts/AuthContext';

const Login = () => {
  const auth = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: {isSubmitting},
  } = useForm({
    defaultValues: {
      username: 'mor_2314',
      password: '83r5^_',
    },
  });

  useEffect(() => {
    console.log('Login');
  }, []);

  const handleLogin = async (data: {username: string; password: string}) => {
    try {
      const response = await Axios.post('auth/login', {
        username: data.username,
        password: data.password,
      });

      if(response.status === 200) {
        console.log(response.data);
        auth.signIn(response.data.token);
      }else{
        Alert.alert('Error', 'Username or password is incorrect');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Username or password is incorrect');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'default'} />
      <ScrollView>
        <View style={styles.box_logo}>
          <Image source={ImageCCU} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.form}>
          <CustomInput
            control={control}
            name="username"
            title="Username"
            placeholder="Username"
            style={{color: ColorsTheme.white}}
            placeholderTextColor={ColorsTheme.white}
            backgroundColor={ColorsTheme.ccu_light_green}
            rules={{required: 'Username is required'}}
          />
          <CustomInput
            control={control}
            name="password"
            title="Password"
            placeholder="Password"
            style={{color: ColorsTheme.white}}
            placeholderTextColor={ColorsTheme.white}
            backgroundColor={ColorsTheme.ccu_light_green}
            rules={{required: 'Password is required'}}
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={handleSubmit(handleLogin)}
            disabled={isSubmitting}>
            {isSubmitting ? (
              <ActivityIndicator size="small" color={ColorsTheme.white} />
            ) : (
              <CustomText bold center white>
                Login
              </CustomText>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorsTheme.white,
  },
  form: {
    padding: 16,
  },
  logo:{
    width: 200,
    height: 200,
  },
  box_logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn:{
    marginVertical: 16,
    backgroundColor: ColorsTheme.ccu_dark_green,
    padding: 8,
    borderRadius: 8,
  },
});

export default Login;
