import Tabbar from "react-native-tabbar-bottom";
import React, { Component } from "react";
import { View,StatusBar} from "react-native";
import Home from "../Home/index";
import Categories from "../Categories/index";
import More from "../More/index";
import Bookmarks from "../Bookmarks/index";
import style from "./style";
import Header from "../../Components/Header/index";
import container from '../../Styles/container';
import SplashScreen from 'react-native-splash-screen';
import AdvertisementBanner from '../AdBanner/index';
import Config from "../../Config/index";
export default class exampleTabs extends Component {
  constructor() {
    super();
    this.state = {
      page: "HomeScreen"
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  componentWillMount() {
    SplashScreen.hide()
  }
  render() {
    return (
      <View style={container.container}>
        <StatusBar backgroundColor={'#fff'}    barStyle="dark-content"/>
        {/* // if you are using react-navigation just pass the navigation object in your components like this: */}
        {
          //this.state.page === "HomeScreen" && <MyComp navigation={this.props.navigation}>Screen1</MyComp>
        }

        {this.state.page === "HomeScreen" && (
          <Home navigation={this.props.navigation}>Screen1</Home>
        )}
        {this.state.page === "NotificationScreen" && (
          <Categories navigation={this.props.navigation}>Screen2</Categories>
        )}
        {this.state.page === "ProfileScreen" && (
          <Bookmarks navigation={this.props.navigation}>Screen1</Bookmarks>
        )}
        {this.state.page === "ChatScreen" && (
         
          <More navigation={this.props.navigation}>Screen4</More>
        )}
        {/* {this.state.page === "SearchScreen" && <Text>Screen5</Text>} */}
        {/* <AdvertisementBanner adUnitID={Config.banner.homeAdID} />  */}
        <Tabbar
          tabbarBgColor="#fff"
          iconColor="#000"
          selectedIconColor="#0099FA"
          tabbarBorderTopColor={'#8091A5'}
          rippleEffect={true}
          stateFunc={tab => {
            this.setState({ page: tab.page });
            // this.props.navigation.setParams({tabTitle: tab.title})
          }}
          activePage={this.state.page}
          tabs={[
            {
              page: "HomeScreen",
              icon: "home"
            },
            {
              page: "NotificationScreen",
              icon: "apps"
            },
            {
              page: "ProfileScreen",
              icon: "bookmark"
            },
            {
              page: "ChatScreen",
              icon: "more"
            }
          ]}
        />
      
      </View>
    );
  }
}
