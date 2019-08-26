import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Header from "../../Components/HeaderText/index";
import container from "../../Styles/container";
import styles from "./style";
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      msg: "",
     // isLoading: false
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  handlePress = () => {
    const { username } = this.state;
    const { email } = this.state;
    const { msg } = this.state;
    var formData = new FormData();
    
      if (this.state.username.trim() === "") {
        this.setState(() => ({ nameError: "Full name required." }));
      } else {
        this.setState(() => ({ nameError: null }));
        formData.append("name", username);
      }
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(this.state.email) === true) {
        // alert("email send successfully");
        formData.append("email", email);
        this.setState(() => ({ emailError: null }));
      } else {
        //alert("Not a valid email address");
        this.setState(() => ({ emailError: "Enter a valid email address" }));
      }
      if (this.state.msg.trim() === "") {
        this.setState(() => ({ msgError: "Brief message field required" }));
      } else {
        this.setState(() => ({ msgError: null }));
        formData.append("message", msg);
      }
    fetch("http://itechnotion.in/wp-news/api/contact_us.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      },
      body: formData
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        // this.setState({
        //   isLoading: true
        // });
        console.log(responseJson.message);
      //  alert(responseJson.message);
      if(responseJson.status == 1)
      {
        Alert.alert(
          'success',
          responseJson.message,
          [
           // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
           // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () =>{this.props.navigation.navigate("MainScreen")}},
          ],
          { cancelable: false }
        )
        }
      })
      .catch(error => {
        console.error(error);
       // alert("Something went to wrong");
        // Alert.alert(
        //   'Error',
        //   responseJson.message,
        //   [
        //    // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        //    // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        //     {text: 'OK', onPress: () =>{this.props.navigation.navigate("MainScreen")}},
        //   ],
        //   { cancelable: false }
        // )
      });
  };

  render() {
    // if (this.state.isLoading) {
    //   return (
    //     <ActivityIndicator
    //       animating={true}
    //       style={styles.indicator}
    //       size="large"
    //     />
    //   );
    // } 
      return (
        <View style={container.container}>
          <Header
            Title="Contact Us"
            source={require("../../image/arrowBack.png")}
            onPressSearch={() => this.props.navigation.navigate("MainScreen")}
          />
          <ScrollView style={{ flex: 1 }} scrollEnabled={false}>
            <View style={styles.container}>
              <View elevation={5} style={styles.buttonContainer}>
                <TextInput
                  style={styles.TextInputContainer}
                  placeholder="Full name"
                  underlineColorAndroid="transparent"
                  onChangeText={username => this.setState({ username })}
                  value={console.log(this.state.username)}
                />
              </View>
              {!!this.state.nameError && (
                  <Text style={{ color: "red",alignSelf:'flex-end'}}>{this.state.nameError}</Text>
                )}
              <View elevation={5} style={styles.buttonContainer}>
                <TextInput
                  style={styles.TextInputContainer}
                  placeholder="Email"
                  underlineColorAndroid="transparent"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={email => this.setState({ email })}
                  value={console.log(this.state.email)}
                /> 
              </View>
              {!!this.state.emailError && (
                  <Text style={{ color: "red",alignSelf:'flex-end'}}>{this.state.emailError}</Text>
                )}
              <View elevation={5} style={styles.buttonContainer}>
                <TextInput
                  style={[styles.TextInputContainer, { height: 100,marginVertical:8}]}
                  placeholder="Brief message"
                  underlineColorAndroid="transparent"
                  onChangeText={msg => this.setState({ msg })}
                  value={console.log(this.state.msg)}
                  multiline={true}
                  //numberOfLines={3}
                />
              </View>
              {!!this.state.msgError && (
                  <Text style={{ color: "red",alignSelf:'flex-end'}}>{this.state.msgError}</Text>
                )}
              <View
                elevation={5}
                style={[
                  styles.buttonContainer,
                  { backgroundColor: "#B5BFCB", width: 150, marginTop: 20 ,alignSelf:'center'}
                ]}
              >
                <TouchableOpacity onPress={this.handlePress}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignContent: "center"
                    }}
                  >
                    <Text style={styles.TextButton}>SEND</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
