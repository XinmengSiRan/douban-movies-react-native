import React, { Component } from 'react';
import { Dimensions, Text, View, Button, FlatList } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { createAppContainer, createStackNavigator} from 'react-navigation';

const { width, height } = Dimensions.get('window');

export default class Search extends Component {
    static navigationOptions = {
        title: 'Search',
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>找片</Text>
            </View>
        );
    }
}