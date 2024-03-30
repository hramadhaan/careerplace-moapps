import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RootStackParamList} from '../types/AppNavigation';

type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'SplashScreen'
>;

interface Props extends NavigationProps {}

const SplashScreen: React.FC<Props> = props => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {},
});

export default SplashScreen;
