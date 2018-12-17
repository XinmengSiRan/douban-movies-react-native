import React, { Component } from 'react';
import { 
    ActivityIndicator,
    StyleSheet, 
    Image,
    Text,
    TouchableOpacity, 
    View, 
    FlatList,
} from 'react-native';

import Star from './Star';

export default class SoonList extends Component {
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
        fetch('https://api.douban.com/v2/movie/coming_soon')
        .then((response => {
            this.setState({refreshing: false});
            return response.json();
        })).then((responseJson) => {
            console.log(responseJson);
            const dataArr = responseJson.subjects;
            this.setState({
                ready: false,
                refreshing: false,
                data: dataArr
            });
        }).catch((eror) => {
            console.error(error);
        });
    }

    _refreshData = () => {
        this.setState({refreshing: true});
        this._fetchData();
    }

    renderMovieItem = (item) => {
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
                        <Star value={item.rating}></Star>
                    </View>
                    <Text style={styles.smallFont}>导演：{item.directors[0].name}</Text>
                    <Text style={styles.smallFont}>主演：{item.casts.map((v)  => v.name).join('/')}</Text>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                    <Text style={[styles.smallFont, styles.yellowFont]}>{
                        (item.collect_count / 10000.0 > 1) 
                        ? (item.collect_count / 10000.0).toFixed(1) + '万人想看'
                        : item.collect_count + '人想看'

                    }
                    </Text>
                    <TouchableOpacity
                    style={styles.buyTicket}>
                        <Text style={styles.yellowFont}>想看</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const {data} = this.state;
        const {navigate} = this.props.navigation;
        return (
            <View>
            {
                this.state.ready
                ? <ActivityIndicator size='large' style={styles.loadding} />
                : <FlatList
                data={data}
                onRefresh={this._refreshData}
                refreshing={this.state.refreshing}
                keyExtractor={(item, index) => index + item}
                renderItem={({item}) => this.renderMovieItem(item)} />
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
        borderColor:'#EFA300',
        justifyContent: 'center',
        alignItems: 'center'
    },
    yellowFont: {
        color: '#EFA300'
    },
    star: {
        marginTop: 10,
        marginBottom: 10
    }
});