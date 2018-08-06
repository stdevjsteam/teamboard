import React, { Fragment } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Image,
  Text,
  ImageSourcePropType
} from 'react-native';

const Presentational = ({
  title,
  image
}: {
  title: string;
  image: ImageSourcePropType;
}) => (
  <View style={styles.container}>
    {Platform.OS === 'ios' ? (
      <Fragment>
        <Image source={image} />
        <Text style={styles.title}>{title.toUpperCase()}</Text>
      </Fragment>
    ) : (
      <Fragment>
        <Text style={styles.title}>{title.toUpperCase()}</Text>
        <Image source={image} />
      </Fragment>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around'
  },
  title: {
    fontFamily: 'RussoOne-Regular',
    fontSize: 24,
    color: '#000'
  }
});

export default Presentational;
