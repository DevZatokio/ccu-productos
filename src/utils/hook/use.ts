import {Platform} from 'react-native';
import moment from 'moment';

export const useIsAndroid = () => Platform.OS === 'android';
export const useIsIOS = () => Platform.OS === 'ios';
export const HookMoment = (inp?: moment.MomentInput, strict?: boolean | undefined) => {
  return moment(inp, strict);
};
