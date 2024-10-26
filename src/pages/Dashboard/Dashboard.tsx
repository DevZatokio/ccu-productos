import {SafeAreaView, TouchableOpacity, FlatList, View} from 'react-native';
import CustomText from '../../components/CustomText';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import Axios from '../../utils/Axios';
import { Product } from '../../interfaces/Product';


const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      const response = await Axios.get('products');
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('Dashboard');
    getProducts();
  }, []);

  const auth = useContext(AuthContext);

  return (
    <SafeAreaView style={{flex: 1, padding: 16, backgroundColor: 'white'}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <CustomText xl primary>Dashboard</CustomText>
        <TouchableOpacity
          style={{backgroundColor: 'red', padding: 8, borderRadius: 8}}
          onPress={() => {
            auth.signOut();
          }}>
          <CustomText bold white>Logout</CustomText>
        </TouchableOpacity>
      </View>
      <FlatList  data={products} renderItem={({item}) => <CustomText>{item.title}</CustomText>} />
    </SafeAreaView>
  );
};

export default Dashboard;
