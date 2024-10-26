import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {ColorsTheme} from '../../configs';

const LoadingView = ({
  color = ColorsTheme.white,
  background = ColorsTheme.ccu_dark_green,
  style,
}: {
  color?: string;
  background?: string;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <View
      style={[
        style
          ? style
          : [
              styles.container,
              {
                backgroundColor: background,
              },
            ],
      ]}>
      <ActivityIndicator size={'large'} color={color} />
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
});

export default LoadingView;
