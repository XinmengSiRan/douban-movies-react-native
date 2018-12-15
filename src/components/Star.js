
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
        value: '60',
        width: 12,
        height: 12
    };
    static propTypes = {
        value: PropTypes.string.isRequired,
    };
    constructor(props) {
        super(props);
    }

    _renderStars(props) {
        const {value, width, height} = props;
        const stars = [];
        let flag = true;
        if (value == '00') {
            return <Text>暂无评分</Text>
        }

        for (let i = 0; i < 5; i++) {
            if (i < value[0]) {
                stars.push(
                    <Image 
                    key={i}
                    style={{width: width, height: height}} 
                    source={require('../images/star-full.png')}/>
                );
            }else{
                if (flag && value[1] == '5') {
                    flag = false;
                    stars.push(
                        <Image 
                        key={i}
                        style={{width: width, height: height}} 
                        source={require('../images/star-half.png')}/>
                    );
                }else{
                    stars.push(
                        <Image 
                        key={i}
                        style={{width: width, height: height}} 
                        source={require('../images/star-empty.png')}/>
                    );
                }
            } 
        }
        return stars;
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
    }
});