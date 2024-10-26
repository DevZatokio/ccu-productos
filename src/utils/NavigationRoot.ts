import { createNavigationContainerRef } from '@react-navigation/native';
import { TabActions } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params: object | undefined = undefined) {
  if (navigationRef.isReady()) {
    navigationRef.navigate( name, params );
  }
}

export function navigationJumpTo(name: string, params: object | undefined = undefined) {
  if (navigationRef.isReady()) {
    const jumpToAction = TabActions.jumpTo(name, params);
    navigationRef.dispatch(jumpToAction);
  }
}
