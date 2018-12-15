/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import AppContainer from './src';

type Props = {
  navigation: any
}; 
export default class App extends Component <Props>{
  render() {
    return (
        <AppContainer />
    );
  }
}
