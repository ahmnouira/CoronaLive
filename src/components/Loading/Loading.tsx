import React from 'react'; 
import { View, StatusBar, ActivityIndicator } from 'react-native';
import * as global from '../../styles/global';

const Loading = () =>
    <View style={[global.COMMON_STYLES.container, { backgroundColor: global.BG_COLOR }]}>
        <StatusBar barStyle="dark-content" />
        <ActivityIndicator animating={true} color="white" size="large" />
    </View>

export default Loading;     