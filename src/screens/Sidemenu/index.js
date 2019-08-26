import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./style"
import { NavigationActions } from "react-navigation";
import { ScrollView, Text, View, Platform, TouchableOpacity } from "react-native";

class SideMenu extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };
  render() {
    return (
      <View
        style={{
          marginTop: Platform.OS == "ios" ? 20 : 0,
          backgroundColor: "#fff",
          flex: 1
        }}
      >
        <ScrollView>
          <View style={{ marginTop: 10, marginHorizontal:30 }}>
            <View>
              <Text
                style={{
                  fontSize: 25,
                  color: "#4EC0EC",
                  fontWeight: "bold",
                  marginVertical: 22,
                  marginHorizontal: 10,
                }}
              >
              <Text style={[{color:'#787D81',alignSelf:'center',fontSize:18,justifyContent:'center'},this.props.textStyle]}>
                <Text style={{color:'#4A84FC'}}>W</Text>
                <Text style={{color:'#E64D37'}}>e</Text>
                <Text style={{color:'#FAC700'}}>b</Text>
                <Text style={{color:'#508DFC'}}>i</Text>
                <Text style={{color:'#4AB24D'}}>l</Text>
                <Text style={{color:'#E64D37',}}>e</Text>
                <Text style={{color:'#606369',}}>News</Text>
            </Text>
              </Text>
            </View>
            
            <View style={styles.sectionHeadingStyle}>
              <TouchableOpacity onPress={this.navigateToScreen("Categorie")}>
                <View style={styles.navSectionStyle}>
                  <Text
                    style={[styles.navItemStyle]}
                  >
                    Categories
                </Text>
                </View>
              </TouchableOpacity>
            </View>

     

            <View style={styles.sectionHeadingStyle} />
            <TouchableOpacity onPress={this.navigateToScreen("MyAccount")}>
              <View style={styles.navSectionStyle}>

                <Text
                  style={styles.navItemStyle}

                >
                  My Account
              </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.navigateToScreen("Order")}>
              <View style={styles.navSectionStyle}>
                <Text
                  style={styles.navItemStyle}

                >
                  My Orders
              </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.navigateToScreen("AddToCarts")}>
              <View style={styles.navSectionStyle}>
                <Text
                  style={styles.navItemStyle}

                >
                  My Cart
              </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.navigateToScreen("Notification")}>
              <View style={styles.navSectionStyle}>
                <Text
                  style={styles.navItemStyle}

                >
                  My Notification
              </Text>
              </View>
            </TouchableOpacity>

          

            <View style={styles.sectionHeadingStyle}>

              <TouchableOpacity onPress={this.navigateToScreen("Setting")}>
                <View style={styles.navSectionStyle}>
                  <Text
                    style={styles.navItemStyle}

                  >
                    Setting
                </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.navigateToScreen("Help")}>
                <View style={styles.navSectionStyle}>
                  <Text
                    style={styles.navItemStyle}

                  >
                    Help
                </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.navigateToScreen("Policies")}>
                <View style={styles.navSectionStyle}>
                  <Text
                    style={styles.navItemStyle}

                  >
                    Policies
                </Text>
                </View>
              </TouchableOpacity>
            </View>

            <LinearGradientLine/>

            <View style={styles.sectionHeadingStyle}>
              <TouchableOpacity onPress={this.navigateToScreen("AboutUs")}>
                <View style={styles.navSectionStyle}>
                  <Text
                    style={styles.navItemStyle}

                  >
                    About Us
                </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.navigateToScreen("ContactUs")}>
                <View style={styles.navSectionStyle}>
                  <Text
                    style={styles.navItemStyle}

                  >
                    Contact Us
                </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.navigateToScreen("Login")}>
                <View style={styles.navSectionStyle}>
                  <Text
                    style={styles.navItemStyle}
                  >
                    Logout
                </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;
