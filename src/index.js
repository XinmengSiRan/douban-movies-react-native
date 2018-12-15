import React, { Component } from 'react';
import { Dimensions, AppRegistry, StyleSheet, Text, View, ButtonTouchableOpacity, Image, ScrollView, FlatList, ActivityIndicator} from 'react-native';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { createStore} from 'redux';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';

import PlayList from './components/PlayList';
import Search from './components/Search';
import My from './components/My';
import Icon from 'react-native-vector-icons/Ionicons';


/*为了注释调试提醒*/
console.ignoredYellowBox = ['Remote debugger'];
const BottomTabNavigator = createBottomTabNavigator({
    热映: {
        screen: createStackNavigator({PlayList}),
        navigationOptions: {
            tabBarLabel: '热映',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-tv" size={20} color={tintColor} />
            )
        }
    },
    找片: {
        screen: createStackNavigator({Search}),
        navigationOptions: {
            tabBarLabel: '找片',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-eye" size={20} color={tintColor} />
            )
        }
    },
    我的: {
        screen: createStackNavigator({My}),
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-person" size={20} color={tintColor} />
            )
        }
    }
}, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
        activeTintColor: '#494949',
        inactiveTintColor: '#999999',
        labelStyle: {
            fontSize: 12,
            marginBottom: 5
        },
        style: {
            borderTopWidth: 1,
            borderTopColor: '#eeeeee',
            height: 50,
            backgroundColor: '#ffffff'
        }
    }
});

const AppContainer = createAppContainer(BottomTabNavigator);

export default AppContainer;

