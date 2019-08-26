import React, { Component } from 'react'
import { Text, View,ScrollView,WebView,ActivityIndicator} from 'react-native'
import container from "../../Styles/container";
import Header from "../../Components/HeaderText/index";
import style from './style';
import config from '../../Config/index';
export default class index extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  ActivityIndicatorLoadingView() {
    return (
      <View style={container.container}>
      <ActivityIndicator
        animating={true}
        style={style.indicator}
        size="large"
      />
      </View>
    );
  }
  render() {
    return (
      <View style={container.container}>
      <Header
        Title="About Us"
        source={require("../../image/arrowBack.png")}
        onPressSearch={() => this.props.navigation.navigate("MainScreen")}
      />
      {/* <ScrollView>
        <View style={container.marginHorizontal}> */}
        <WebView
         source = {{uri:config.url+'about-us/'}}
         renderLoading={this.ActivityIndicatorLoadingView} 
         startInLoadingState={true}  
         />
        {/* </View>
      </ScrollView> */}
    </View>
    )
  }
}