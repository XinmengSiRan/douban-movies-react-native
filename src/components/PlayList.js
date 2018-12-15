import React, { Component } from 'react';
import { StyleSheet, Dimensions, Text, View, Button, FlatList } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { createAppContainer, createStackNavigator} from 'react-navigation';

import HotList from './HotList';

export default class PlayList extends Component {
    static navigationOptions = {
        title: 'Home'
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollableTabView
                    renderTabBar={() => <DefaultTabBar/> }
                    tabBarUnderlineStyle={{
                        backgroundColor: '#000',
                        height: 2
                    }}
                    tabBarBackgroundColor='#fff'
                    tabBarActiveTextColor='#000'
                    tabBarInactiveTextColor='#959595'
                    tabBarTextStyle={{ fontSize: 16 }}
                    locked={false}
                >
                    <View tabLabel='正在热映' style={{marginBottom:50}}>
                        <HotList navigation={this.props.navigation}></HotList>
                    </View>
                    <View tabLabel='即将上映' style={{marginBottom:50}}>
                    </View>

                </ScrollableTabView>
            </View>
        );
    }
}

const { width, height } = Dimensions.get('window');
const IS_IPHONE_X_SERIES = () => {
    if (height == 812 || height == 896) {
        return true;
    }else{
        return false;
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: IS_IPHONE_X_SERIES ? (height - 88 - 34) : (height - 64),
        paddingTop: 10,
        backgroundColor: '#fff'
    }
});