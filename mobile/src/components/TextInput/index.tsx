import { Platform } from 'react-native';

if (Platform.OS === 'ios') {
  module.exports = require('./index.ios');
} else {
  module.exports = require('./index.android');
}
