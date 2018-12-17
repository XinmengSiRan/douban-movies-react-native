
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

import PropTypes from 'prop-types';

export default class Star extends Component {
    static defaultProps = {
        value: {},
        width: 12,
        height: 12
    };
    static propTypes = {
        value: PropTypes.object.isRequired,
    };
    constructor(props) {
        super(props);
    }

    _renderStars(props) {
        const {value, width, height} = props;
        const {stars, average} = value;
        const results = [];
        let flag = true;
        if (stars == '00') {
            return <Text>暂无评分</Text>
        }

        for (let i = 0; i < 5; i++) {
            if (i < stars[0]) {
                results.push(
                    <Image 
                    key={i}
                    style={{width: width, height: height}} 
                    source={require('../images/star-full.png')}/>
                );
            }else{
                if (flag && stars[1] == '5') {
                    flag = false;
                    results.push(
                        <Image 
                        key={i}
                        style={{width: width, height: height}} 
                        source={require('../images/star-half.png')}/>
                    );
                }else{
                    results.push(
                        <Image 
                        key={i}
                        style={{width: width, height: height}} 
                        source={require('../images/star-empty.png')}/>
                    );
                }
            } 
        }
        results.push(<Text key={5} style={styles.average}>{average.toFixed(1)}</Text>);
        return results;
    }

    render() {
        return (
            <View style={styles.star}>
                {this._renderStars(this.props)}
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    defaultString: {
        lineHeight: 20,
        color: '#A6A6A6',
        fontSize: 12
    },
    star: {
        flexDirection: 'row'
    },
    average: {
        color: '#A6A6A6',
        paddingLeft: 5,
        fontSize: 12
    }
});