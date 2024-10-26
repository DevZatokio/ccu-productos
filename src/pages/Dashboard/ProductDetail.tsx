import {useEffect, useState} from 'react';
import {Image,ScrollView, SafeAreaView, StyleSheet, View, Alert} from 'react-native';
import Axios from '../../utils/Axios';
import {useNavigation} from '@react-navigation/native';
import { Product } from '../../interfaces/Product';
import LoadingView from '../Loading/LoadingView';
import CustomText from '../../components/CustomText';

const ProductDetail = ({route}: any) => {
  const {id} =  route.params;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<Product>({} as Product);

  const getProduct = async () => {
    try {
      setIsLoading(true);
      const response = await Axios.get(`products/${id}`);
      if(response.status === 200) {
        setIsLoading(false);
        setProduct(response.data);
      }
    } catch (error) {
      Alert.alert('Error', 'Product not found');
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getProduct();
    } else {
      console.log('No id');
      navigation.goBack();
    }
  }, [id]);

  if(!product &&   isLoading) {
    return  <LoadingView />
  }

  return <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
    <ScrollView>
      <View>
        <Image source={{uri: product.image}} style={styles.image} resizeMode={'contain'} />
      </View>
      <View style={{padding: 16}}>
        <CustomText mdx bold dark style={{marginBottom: 8}}>
          {product.title}
        </CustomText>
        <CustomText primary md style={{marginBottom: 16}}>
          {product.description}
        </CustomText>
        <CustomText bold primary xl>
          ${product.price}
        </CustomText>
      </View>
    </ScrollView>
  </SafeAreaView>;
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
});

export default ProductDetail;
