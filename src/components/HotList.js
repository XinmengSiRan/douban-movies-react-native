import React, { Component } from 'react';
import { 
    ActivityIndicator,
    StyleSheet, 
    Dimensions,
    Image,
    Text,
    TouchableOpacity, 
    TouchableWithoutFeedback,
    View, 
    Button, 
    FlatList 
} from 'react-native';

import Star from './Star';

export default class HotList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: true,
            refreshing: false,
            data: []
        }
    }

    componentDidMount() {
        this._fetchData();
    }

    handleOnPress = () => {

    }
    
    _fetchData = () => {
        fetch('https://api.douban.com/v2/movie/in_theaters')
        .then((response) => {
            this.setState({refreshing: false});
            return response.json();
        }).then((responseJson) => {
            console.log('response', responseJson);
            const dataArr = responseJson.subjects;
            this.setState({
                ready: false,
                refreshing: false,
                data: dataArr
            });

        }).catch((error) => {
            console.error(error);
        });
    }

    _refreshData = () => {
        this.setState({refreshing: true});
        this._fetchData();
    }
    render() {
        const {navigate} = this.props.navigation;
        const {data} = this.state;
        return (
            <View style={styles.container}>
            {
                this.state.ready 
                ? <ActivityIndicator size='large' style={styles.loadding}/>
                : <FlatList
                data={data}
                onRefresh={this._refreshData}
                refreshing={this.state.refreshing}
                keyExtractor={(item, index ) => index+item}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity
                        style={styles.item}
                        onPress={this.handleOnPress}>
                            <View style={{flex: 1,}}>
                                <Image 
                                source={{uri: item.images.large}}
                                style={styles.image} />
                            </View>
                            <View style={{flex: 2, alignItems: 'flex-start', paddingLeft: 5}}>
                                <Text style={styles.title}>{item.title}</Text>
                                <View style={styles.star}>
                                    <Star value={item.rating.stars}></Star>
                                </View>
                                <Text style={styles.smallFont}>导演：{item.directors[0].name}</Text>
                                <Text style={styles.smallFont}>主演：{item.casts.map((v)  => v.name).join('/')}</Text>
                            </View>
                            <View style={{alignItems: 'flex-end'}}>
                                <Text style={[styles.smallFont, styles.redFont]}>{
                                    (item.collect_count / 10000.0 > 1) 
                                    ? (item.collect_count / 10000.0).toFixed(1) + '万人看过'
                                    : item.collect_count + '人看过'

                                }
                                </Text>
                                <TouchableOpacity
                                style={styles.buyTicket}>
                                    <Text style={styles.redFont}>购票</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                }} />
            }  
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loadding: {
        marginTop: 30
    },
    item: {
        height: 140,
        paddingLeft: 18,
        paddingRight: 18,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
       
    },
    image: {
        width: 80,
        height: 120,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    smallFont: {
        fontSize: 12,
        lineHeight: 20,
        color: '#A6A6A6'
    },
    buyTicket: {
        width: 60,
        height: 30,
        marginTop: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor:'#FF4E65',
        justifyContent: 'center',
        alignItems: 'center'
    },
    redFont: {
        color: '#FF4E65',
    },
    yellowFont: {
        color: '#EFCE00'
    },
    star: {
        marginTop: 10,
        marginBottom: 10
    }
});