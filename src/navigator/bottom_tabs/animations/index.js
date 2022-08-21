import {initializeRegistryWithDefinitions} from 'react-native-animatable';

export const ANIMATIONS = {
  ZOOM_IN_OUT: 'zoomInOut',
  HEART_BEAT: 'heartBeat',
};

export default function register() {
  const HEART_BEAT_DEFAULT = {scale: 1, easing: 'ease-in-out'};

  initializeRegistryWithDefinitions({
    [ANIMATIONS.ZOOM_IN_OUT]: {
      0: {
        // scale: 1,
        scale: .6,
      },
      0.25: {
        // scale: 1.2,
        scale: .7,
      },
      0.5: {
        // scale: 1.2,
        scale: .8,
      },
      0.75: {
        // scale: 1.1,
        scale: .9,
      },
      1: {
        scale: 1,
      },
    },
    [ANIMATIONS.HEART_BEAT]: {
      0: {...HEART_BEAT_DEFAULT},
      0.14: {...HEART_BEAT_DEFAULT, scale: 1.3},
      0.28: {...HEART_BEAT_DEFAULT},
      0.42: {...HEART_BEAT_DEFAULT, scale: 1.3},
      0.7: {...HEART_BEAT_DEFAULT},
      1: {...HEART_BEAT_DEFAULT},
    },
  });
}
