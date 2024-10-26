import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  View,
  Alert,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import CustomText from '../../components/CustomText';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import Axios from '../../utils/Axios';
import {Product} from '../../interfaces/Product';
import {ColorsTheme} from '../../configs';
import LoadingView from '../Loading/LoadingView';
import {useNavigation} from '@react-navigation/native';

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const auth = useContext(AuthContext);
  const navigation = useNavigation<any>();

  const [isLoading, setIsLoading] = useState(false);
  const getProducts = async () => {
    try {
      setIsLoading(true);
      const response = await Axios.get('products');
      if (response.status === 200) {
        setIsLoading(false);
        setProducts(response.data);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Products not found');
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (isLoading) {
    return <LoadingView />;
  }
  const ProductDetail = (id: number) => {
    navigation.navigate('ProductDetail', {id});
  };

  const renderProduct = ({item}: {item: Product}) => {
    return (
      <TouchableOpacity
        onPress={() => ProductDetail(item.id)}
        style={styles.container_item}>
        <View style={styles.box_image}>
          <Image
            source={{uri: item.image}}
            style={styles.image}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles.box_description}>
          <CustomText mdx bold dark style={{marginBottom: 8}}>
            {item.title}
          </CustomText>
          <CustomText bold primary lg>
            ${item.price}
          </CustomText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="default" />
      <View style={styles.container}>
        <CustomText xl primary bold>
          Dashboard
        </CustomText>
        <TouchableOpacity
          style={styles.btn_logout}
          onPress={() => {
            auth.signOut();
          }}>
          <CustomText bold white>
            Logout
          </CustomText>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        renderItem={renderProduct}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: ColorsTheme.white},
  list: {
    flex: 1,
    padding: 16,
  },
  container: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  btn_logout: {backgroundColor: 'red', padding: 8, borderRadius: 8},
  container_item: {
    marginTop: 16,
    marginBottom: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: ColorsTheme.ccu_dark_green,
  },
  box_image: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {width: 100, height: 100},
  box_description: {
    flex: 1,
    marginLeft: 16,
  },
});

export default Dashboard;
