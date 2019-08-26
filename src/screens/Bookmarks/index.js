import React, { Component } from "react";
import {
  View,
  ListView,
  TouchableOpacity,
  Image,
  Platform,
  TextInput,
  Text,
  AsyncStorage,
  ScrollView,
  ActivityIndicator,
  Share,
  RefreshControl,
} from "react-native";
import ListViews from "../../Components/ListView/index";
import container from "../../Styles/container";
import style from "./style";
import { fonts } from "../../utils/fonts";
import renderIf from "../../utils/renderIf";
import HTML from "react-native-render-html";
import BookMarkShare from "../../Components/BookMarkShare/index";
import config from "../../Config/index";
import Icon from "react-native-vector-icons/Ionicons";
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: ds,
      //search value store
      status: true,
      status2: false,
      text: "",
      BookMarkLength: "",
      refreshing: false,
    };
  }
  SearchClickStatus() {
    this.setState({
      status: !this.state.status,
      status2: !this.state.status2
    });
    console.log("Search button handler: " + this.state.status);
    console.log("Search button handler2: " + this.state.status2);
  }
  static navigationOptions = {
    header: null
  };
  fetchDetails = () => {
    return fetch(config.url + "wp-json/wp/v2/posts?per_page=100&_embed")
      .then(response => response.json())
      .then(responseJson => {
        // this.setState({
        //   isLoading: false
        // });
        console.log("responseJson");
        console.log(responseJson);
        var newArr = [];
        AsyncStorage.getItem("favorites").then(value => {
          this.setState({ values: value });
          var aa = JSON.parse(value);
          //console.log("aa");
          //console.log(aa);
          aa.filter(function(x) {
            console.log("x");
            console.log(x);
            responseJson.filter(function(c) {
              if (x == c.id) {
                newArr.push(c);
              }
              console.log("c");
              console.log(c);
            });
            console.log(newArr);
          });
          console.log("newArr");
          console.log(newArr);
          this.setState({
            dataSource: ds.cloneWithRows(newArr),
            BookMarkLength: newArr.length,
            isLoading: false
          });
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentDidMount() {
    this.fetchDetails();
  }
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchDetails().then(() => {
      this.setState({refreshing: false});
    });
  }
  OpenSecondActivity(rowData) {
    onPressed = this.props.onPressed({
      ListViewClickItemHolder: rowData
    });
  }

  render() {
    if (this.state.isLoading) {
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
  else{
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        {/* <Header
          Title="Bookmark"
          source={require("../../image/arrowBack.png")}
          iconStyle={{ marginLeft: 11 }}
          onPressSearch={() => this.props.navigation.navigate("MainScreen")}
        /> */}
        <View
          style={[style.mainView, { marginTop: Platform.OS == "ios" ? 20 : 0 }]}
        >
          <View style={{ flex: 0.1, justifyContent: "center" }}>
            <TouchableOpacity onPress={() => this.SearchClickStatus()}>
              {/* <Image
                source={require("../../image/search.png")}
                style={[
                  {
                    height: 17,
                    width: 17,
                    marginLeft: 15,
                    tintColor: "#787D81"
                  },
                  this.props.iconStyle
                ]}
              /> */}
              <Icon
                name="ios-search"
                color="#787D81"
                size={20}
                style={[
                  {
                    marginLeft: 15
                  },
                  this.props.iconStyle
                ]}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{ flex: 0.9, alignSelf: "center", flexDirection: "row" }}
          >
            {renderIf(this.state.status)(
              <View style={{ flex: 1 }}>
                <View style={{ alignSelf: "center" }}>
                  <HTML
                    html="Bookmark"
                    tagsStyles={{
                      resizeMode: "contain"
                    }}
                    baseFontStyle={{
                      color: "#787D81",
                      fontFamily: fonts.PoppinsMedium,
                      fontSize: 15,
                      justifyContent: "center",
                      fontWeight: "500"
                    }}
                  />
                </View>
              </View>
            )}
            {renderIf(this.state.status2)(
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <View
                  style={{ flex: 0.7, justifyContent: "center", marginLeft: 8 }}
                >
                  <TextInput
                    style={{ fontSize: 14, color: "#787D81" }}
                    onChangeText={text => this.setState({ text })}
                    value={this.state.text}
                    placeholder="Type here"
                    onKeyPress={console.log("Enter value" + this.state.text)}
                    underlineColorAndroid="transparent"
                    returnKeyType={"search"}
                    onSubmitEditing={() =>
                      this.props.navigation.navigate("SearchCategoriesList", {
                        text: this.state.text
                      })
                    }
                  />
                </View>
                <View style={{ flex: 0.3, justifyContent: "center" }}>
                  <TouchableOpacity onPress={() => this.SearchClickStatus()}>
                    <Text
                      style={{
                        alignSelf: "flex-end",
                        marginRight: 15,
                        color: "#787D81"
                      }}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
          {renderIf(this.state.status)(<View style={{ flex: 0.1 }} />)}
        </View>
        {this.state.BookMarkLength == 0  ? (
                <View style={{ justifyContent: "center",flex:1,alignItems:'center',}}>
                  <Image
                    style={{ width: 50, height: 50, alignSelf: "center",tintColor:'#606369'}}
                    source={require("../../image/no_bookmark.jpg")}
                  />

                  <Text
                    style={{
                      fontSize: 18,
                      color: "#FF9999",
                      textAlign: "center",
                      fontWeight: "800",
                      alignSelf:'center'
                    }}
                  >
                    No Bookmark Available
                  </Text>
                </View>
              ) : (
        <View style={container.container}>
          <ScrollView style={{ flex: 1, marginBottom: 40 }}
          refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
            <View
              cornerRadius={5}
              cardElevation={2}
              cardMaxElevation={2}
              style={[container.marginHorizontal, { flex: 1 }]}
            >
              
                <ListView
                  showsVerticalScrollIndicator={false}
                  dataSource={this.state.dataSource}
                  renderRow={rowData => (
                    <View
                      style={{
                        flexDirection: "column",
                        flex: 1,
                        borderBottomColor: "#E4ECF5",
                        borderBottomWidth: 0.95,
                        marginBottom: 10
                      }}
                    >
                      <View style={{ flex: 0.6 }}>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate("Details", {
                              rowData
                            })
                          }
                        >
                          <ListViews
                            Categories={
                              rowData._embedded["wp:term"][0][0]["name"]
                            }
                            Title={rowData.title.rendered}
                            source={
                              rowData.featured_media != 0
                                ? {
                                    uri:
                                      rowData._embedded["wp:featuredmedia"]["0"]
                                        .source_url
                                  }
                                : require("../../image/img_not_found.jpg")
                            }
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={{ flex: 0.15 }}>
                        <TouchableOpacity
                          onPress={() =>
                            Share.share(
                              {
                                message: rowData.link
                              },
                              {
                                dialogTitle: "This is share dialog title",
                                excludedActivityTypes: [
                                  "com.apple.UIKit.activity.PostToTwitter",
                                  "com.apple.uikit.activity.mail"
                                ],
                                tintColor: "green"
                              }
                            )
                              .then(this._showResult)
                              .catch(err => console.log(err))
                          }
                        >
                          <BookMarkShare
                            Time={rowData.date}
                            // onPressBookmark={() =>
                            //   this.props.navigation.navigate("Home")
                            // }
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    // <TouchableOpacity
                    //   style={{ flexDirection: "row", flex: 1 }}
                    //   onPress={() =>
                    //     this.props.navigation.navigate("Details", { rowData })
                    //   }
                    // >
                    //   <ListViews
                    //     Categories={rowData.category_arr[0].name}
                    //     Title={rowData.title.rendered}
                    //     Time={rowData.date}
                    //     source={{ uri: rowData.featured_image_link }}
                    //   />
                    // </TouchableOpacity>
                  )}
                />
           
            </View>
          </ScrollView>
        </View>
        )}
      </View>
    );
  }
}
}
