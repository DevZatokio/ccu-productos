import React from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import {ColorsTheme} from '../../configs';
import {ImageCCU} from '../../images';

const LoadingInit = ({
  backgroundColor = ColorsTheme.white,
  color = ColorsTheme.ccu_dark_green,
}: {
  color?: string;
  backgroundColor?: string;
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor,
        },
      ]}>
      <Image source={ImageCCU} style={styles.image} resizeMode={'contain'} />
      <ActivityIndicator size={'large'} color={color} style={styles.activity} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 200,
    width: '90%',
  },
  activity: {
    marginTop: 32,
  },
});

export default LoadingInit;
