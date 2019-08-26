import React, { Component } from "react";
import { AdMobBanner, AdMobInterstitial } from "react-native-admob";
import { View } from "react-native";
export default class index extends Component {
  bannerErrorHandler = e => {
    console.log(e);
  };
//   componentDidMount() {
   
//     AdMobInterstitial.setAdUnitID('ca-app-pub-7770856719889795/1700809691');
//    // AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
//     AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
//   }
  render() {
    return (
      <View style={[this.props.style,{marginTop:1}]}>
        <AdMobBanner
          adSize="smartBannerPortrait"
          adUnitID={this.props.adUnitID}
          didFailToReceiveAdWithError={this.bannerErrorHandler}
        />
      </View>
    );
  }
}
