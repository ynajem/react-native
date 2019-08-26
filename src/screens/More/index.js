import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView,Linking} from "react-native";
import Header from "../../Components/HeaderText/index";
import container from "../../Styles/container";
import ToggleSwitch from "toggle-switch-react-native";
import style from "./style";
export default class index extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  state = {
    isOnDefaultToggleSwitch: false
  };
  onToggle(isOn) {
    alert("Changed to " + isOn);
    //Linking.openURL('app-settings://notification/myapp')
  }
  render() {
    return (
      <View style={container.container}>
        <Header
          Title="More"
          //source={require("../../image/search.png")}
        />
        <ScrollView style={{flex:1}}>
        <View style={{flex:1,}}>
          <View
            style={{
              borderBottomColor: "#E4ECF5",
              borderBottomWidth: 0.3,
              marginRight:20,
              marginLeft:15             
            }}
          >
            <ToggleSwitch
              isOn={false}
              onColor="#44C8EB"
              offColor="#808080"
              label="Notification"
              labelStyle={style.labelStyle}
              size="small"
              style={{marginVertical:10}}
              isOn={this.state.isOnDefaultToggleSwitch}
              onToggle={isOnDefaultToggleSwitch => {
                this.setState({ isOnDefaultToggleSwitch });
              }}
            />
          </View>
          <View style={container.marginHorizontal}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("AboutUs")}
            >
              <View
                style={{
                  flexDirection: "row",
                  borderBottomColor: "#E4ECF5",
                  borderBottomWidth: 0.3,
                }}
              >
                <View style={{ flex: 0.5,marginVertical:10,}}>
                <Text style={style.text}>
                    About Us
                  </Text>
                </View>
                <View style={{ flex: 0.5,marginVertical:10,justifyContent:"center"}}>
                  <Image
                    style={style.icon}
                    source={require("../../image/back_right.png")}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("ContactUs")}
            >
              <View
                style={{
                  flexDirection: "row",
                  borderBottomColor: "#E4ECF5",
                  borderBottomWidth: 0.5,
                  marginBottom:5
                }}
              >
                <View style={{ flex: 0.5,  marginVertical:10, }}>
                  <Text style={style.text}>
                    Contact Us
                  </Text>
                </View>
                <View style={{ flex: 0.5 ,marginVertical:10,}}>
                  <Image
                     style={style.icon}
                    source={require("../../image/back_right.png")}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
