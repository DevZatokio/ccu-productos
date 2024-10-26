import {Platform} from 'react-native';

const ColorsTheme = {
  dark: '#000000',
  light: '#ffffff',

  white: '#fff',
  black: '#000',

  gray: '#BDBDBD',

  red: '#FF0000',
  green: '#00FF00',
  blue: '#0000FF',

  transparent: 'transparent',

  transparentWhite: 'rgba(255, 255, 255, 0.5)',
  transparentBlack: 'rgba(0, 0, 0, 0.5)',

  transparentRed: 'rgba(255, 0, 0, 0.5)',
  transparentGreen: 'rgba(0, 255, 0, 0.5)',
  transparentBlue: 'rgba(0, 0, 255, 0.5)',

  ccu_dark_green: '#0F4E35',
  ccu_light_green: '#69B03A',
};

export const Sizes = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
};

const FontFamily =
  Platform.OS === 'ios' ? 'MADE Tommy Soft' : 'MADE Tommy Soft Regular';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export {
  ColorsTheme,
  EMAIL_REGEX,
  FontFamily,
};
