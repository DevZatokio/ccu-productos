import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  KeyboardTypeOptions,
  StyleProp,
  TextStyle,
} from 'react-native';
import {Controller, RegisterOptions} from 'react-hook-form';
import {ColorsTheme, FontFamily, Sizes} from '../configs';
import CustomText from './CustomText';

interface CustomInput {
  control: any;
  name: string;
  title?: string;
  rules?: Object | RegisterOptions;
  placeholder?: string;
  errorColor?: string;
  textColor?: string;
  numberOfLines?: number;
  multiline?: boolean;
  style?: StyleProp<TextStyle>;
  backgroundColor?: string;
  maxLength?: number | undefined;
  secureTextEntry?: boolean;
  editable?: boolean;
  lowercase?: boolean;
  keyboardType?: KeyboardTypeOptions;
  textAlignVertical?: 'auto' | 'center' | 'top' | 'bottom' | undefined;
}

const CustomInput: React.FC<CustomInput> = ({
  control,
  title,
  name,
  rules = {},
  placeholder,
  numberOfLines = undefined,
  multiline,
  editable = true,
  lowercase = false,
  maxLength,
  style,
  errorColor = ColorsTheme.danger,
  textColor = ColorsTheme.dark,
  backgroundColor = ColorsTheme.white,
  secureTextEntry,
  keyboardType,
  textAlignVertical,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <View style={{flex: 0, marginBottom: 8}}>
          <View
            style={[
              {flex: 0},
              {borderColor: error ? ColorsTheme.danger : ColorsTheme.light},
            ]}>
            {title && (
              <CustomText style={[styles?.text, {color: textColor}]}>
                {title}
              </CustomText>
            )}
            <View
              style={{
                flex: 0,
                borderRadius: 8,
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: backgroundColor,
              }}>
              <TextInput
                value={value}
                onChangeText={text =>
                  lowercase ? onChange(text.toLowerCase()) : onChange(text)
                }
                onBlur={onBlur}
                numberOfLines={numberOfLines}
                multiline={multiline}
                placeholder={placeholder}
                maxLength={maxLength}
                style={[styles?.input, style]}
                keyboardType={keyboardType}
                editable={editable}
                secureTextEntry={secureTextEntry}
                textAlignVertical={textAlignVertical}
                placeholderTextColor={ColorsTheme.light_secondary}
              />
            </View>
          </View>
          {error && (
            <CustomText
              style={{
                color: errorColor,
                alignSelf: 'stretch',
                paddingLeft: 2,
                marginTop: 4,
                marginBottom: 2,
              }}>
              {error.message || 'Error'}
            </CustomText>
          )}
        </View>
      )}
    />
  );
};

const styles = Platform.select({
  android: StyleSheet.create({
    text: {
      fontSize: Sizes.sm,
      fontWeight: '600',
      marginBottom: 2,
      marginLeft: 2,
    },
    input: {
      fontSize: Sizes.md,
      fontFamily: FontFamily,
      paddingTop: 4,
      paddingBottom: 4,
      paddingRight: 8,
      paddingLeft: 8,
      width: '100%',
      color: ColorsTheme.dark,
    },
  }),
  ios: StyleSheet.create({
    text: {
      fontSize: Sizes.sm,
      fontWeight: '600',
      marginBottom: 2,
      marginLeft: 2,
    },
    input: {
      fontSize: Sizes.md,
      fontFamily: FontFamily,
      paddingTop: 12,
      paddingBottom: 12,
      paddingRight: 8,
      paddingLeft: 8,
      width: '100%',
      color: ColorsTheme.dark,
    },
  }),
});

export default CustomInput;
