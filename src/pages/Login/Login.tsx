import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {
  ActivityIndicator,
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

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  useEffect(() => {
    console.log('Login');
  }, []);

  const handleLogin = async (data: {username: string; password: string}) => {
    console.log('handleLogin');
    try {
      const response = await Axios.post('auth/login', {
        username: data.username,
        password: data.password,
      });

      if(response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={'default'} />
      <ScrollView>
        <View>
          <Image source={ImageCCU} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.form}>
          <CustomInput
            control={control}
            name="username"
            title="Username"
            placeholder="Username"
            rules={{required: 'Username is required'}}
          />
          <CustomInput
            control={control}
            name="password"
            title="Password"
            placeholder="Password"
            rules={{required: 'Password is required'}}
            secureTextEntry
          />
          <TouchableOpacity
            onPress={handleSubmit(handleLogin)}
            disabled={isSubmitting}>
            {isSubmitting ? (
              <ActivityIndicator size="small" />
            ) : (
              <CustomText bold center>
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
  form: {
    padding: 16,
  },
  logo:{
    width: 200,
    height: 200,
  },
});

export default Login;
