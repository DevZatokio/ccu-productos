import React from 'react';
import {Text, StyleSheet, StyleProp, TextStyle} from 'react-native';
import {ColorsTheme, FontFamily, Sizes} from '../configs';

const styles = StyleSheet.create({
  text: {
    fontFamily: FontFamily,
  },
  center: {
    textAlign: 'center',
  },
  justify: {
    textAlign: 'justify',
  },
  left: {
    textAlign: 'left',
  },
  right: {
    textAlign: 'right',
  },
  solid_decoration: {
    textDecorationLine: 'underline',
  },
  font_italic: {
    fontStyle: 'italic',
  },
  md: {
    fontSize: Sizes.md,
  },
  mdx: {
    fontSize: Sizes.mdx,
  },
  xl: {
    fontSize: Sizes.xl,
  },
  xs: {
    fontSize: Sizes.xs,
  },
  lg: {
    fontSize: Sizes.lg,
  },
  sm: {
    fontSize: Sizes.sm,
  },
  bold: {
    fontWeight: 'bold',
  },
  semiBold: {
    fontWeight: '600',
  },
  dark: {
    color: ColorsTheme.dark,
  },
  darkLight: {
    color: ColorsTheme.transparentBlack,
  },
  white: {
    color: ColorsTheme.white,
  },
  primary: {
    color: ColorsTheme.ccu_dark_green,
  },
  secondary: {
    color: ColorsTheme.ccu_light_green,
  },
  danger: {
    color: ColorsTheme.red,
  },
  light: {
    color: ColorsTheme.white,
  },
  fa: {
    color: ColorsTheme.transparentBlack,
  },
  blue: {
    color: ColorsTheme.blue,
  },
});

export interface CustomTextTypeProps {
  children?: any;
  onPress?: () => void;
  style?: StyleProp<TextStyle>;
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  mdx?: boolean;
  lg?: boolean;
  xl?: boolean;
  justify?: boolean;
  right?: boolean;
  left?: boolean;
  bold?: boolean;
  semiBold?: boolean;
  solid_decoration?: boolean;
  dark?: boolean;
  white?: boolean;
  light?: boolean;
  primary?: boolean;
  danger?: boolean;
  secondary?: boolean;
  fa?: boolean;
  darkLight?: boolean;
  blue?: boolean;
  center?: boolean;
  font_italic?: boolean;
}
const CustomText = ({
  children,
  onPress,
  style = {},
  md = false,
  mdx = false,
  sm = false,
  xl = false,
  xs = false,
  lg = false,
  justify = false,
  right = false,
  left = false,
  bold = false,
  semiBold = false,
  solid_decoration = false,
  dark = false,
  white = false,
  primary = false,
  danger = false,
  light = false,
  darkLight = false,
  secondary = false,
  fa = false,
  blue = false,
  center = false,
  font_italic = false,
}: CustomTextTypeProps) => {
  const StylesText = [
    styles.text,
    style,
    md && styles.md,
    xl && styles.xl,
    sm && styles.sm,
    mdx && styles.mdx,
    xs && styles.xs,
    lg && styles.lg,
    bold && styles.bold,
    dark && styles.dark,
    white && styles.white,
    light && styles.light,
    left && styles.left,
    solid_decoration && styles.solid_decoration,
    semiBold && styles.semiBold,
    secondary && styles.secondary,
    primary && styles.primary,
    danger && styles.danger,
    blue && styles.blue,
    fa && styles.fa,
    darkLight && styles.darkLight,
    right && styles.right,
    center && styles.center,
    justify && styles.justify,
    font_italic && styles.font_italic,
  ];

  if (!children || children.length === 0 || children == null || children === undefined) {
    return <></>;
  }

  return (
    <Text style={StylesText} onPress={onPress}>
      {children}
    </Text>
  );
};

export default CustomText;
