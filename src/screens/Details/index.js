import React, { Component } from "react";
import {
  View,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Share,
  StatusBar,
  AsyncStorage,
  ActivityIndicator,
  Dimensions,
  Linking,
  RefreshControl
} from "react-native";
import { fonts } from "../../utils/fonts";
import container from "../../Styles/container";
import Text from "../../Components/TextSemiBold/index";
import TimeAgo from "react-native-timeago";
import styles from "./style";
import Icon from "react-native-vector-icons/Ionicons";
import HTML from "react-native-render-html";
import config from "../../Config/index";
import AdvertisementBanner from "../AdBanner/index";
export default class index extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: "",
      status: "No Page Loaded",
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      scalesPageToFit: true,
      url: "",
      wpid: 0,
      isLiked: "",
      refreshing: false
    };
  }
  fetchDetails = () => {
    this.setState({
      wpid: this.props.navigation.state.params.rowData.id
    });
    console.log(this.props.navigation.state.params.rowData.id);
    return fetch(
      config.url +
        "wp-json/wp/v2/posts/" +
        this.props.navigation.state.params.rowData.id
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        // console.log(responseJson.title.rendered);
        console.log(responseJson.link);
        this.setState({
          isLoading: false,
          dataSource: responseJson,
          url: responseJson.link
        });
        //console.log(this.state.wpid);
      })
      .catch(error => {
        console.error(error);
      });
  };
  _storeData = async () => {
    try {
      var newArr = [];
      newArr.push(this.props.navigation.state.params.rowData.id);
      console.log("Set");
      console.log(newArr);
      await AsyncStorage.setItem("favorites", JSON.stringify(newArr));
    } catch (error) {
      // Error saving data
    }
  };
  async _updateList() {
    const response = await AsyncStorage.getItem("favorites");
    const listOfLikes = (await JSON.parse(response)) || [];
    this.setState({
      favorites: listOfLikes
    });
    // console.log("-------");
    // console.log(this.state.favorites);
    if (listOfLikes.includes(this.props.navigation.state.params.rowData.id)) {
      this.setState({ isLiked: true });
    } else {
      this.setState({ isLiked: false });
    }
    console.log(this.state.isLiked);
  }
  async _addToFavorites() {
    await AsyncStorage.getItem("favorites").then(favs => {
      var id = this.state.wpid;
      // console.log(id);
      console.log("sdfdsfsfsfdsfddfdfsdfsdfsdfsdfs");
      console.log(JSON.parse(favs));

      var array = JSON.parse(favs);
      if (array == null) {
        this._storeData();
        this.setState({ isLiked: true });
      } else {
        console.log(array);
        console.log("-------");
        // console.log(array.indexOf(id));
        var index = array.indexOf(id);
        if (index > -1) {
          array.splice(index, 1);
          this.setState({ isLiked: false });
        } else {
          array.push(id);
          this.setState({ isLiked: true });
        }
        // console.log("-------");
        // console.log(array);
        console.log(this.state.isLiked);
        return AsyncStorage.setItem("favorites", JSON.stringify(array));
      }
    });
  }
  _onPressHeartButton = id => {
    // add to favorites
    this._addToFavorites();
  };
  componentDidMount() {
    this.fetchDetails();
    this._updateList();
    // AdMobInterstitial.setAdUnitID('ca-app-pub-7770856719889795/1700809691');
    // AdMobInterstitial.showAd().catch((e) => {
    //   console.log(e)
    // });
    //  AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
  }
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchDetails().then(() => {
      this.setState({ refreshing: false });
    });
    this._updateList().then(() => {
      this.setState({ refreshing: false });
    });
  };
  _showResult(result) {
    console.log(result);
  }
  _shareTextWithTitle = () => {
    Share.share(
      {
        message: this.state.url
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
      .catch(err => console.log(err));
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={container.container}>
          <ActivityIndicator
            animating={true}
            style={styles.indicator}
            size="large"
          />
        </View>
      );
    }
    return (
      <View style={container.container}>
        <StatusBar hidden={true} />
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
          <View style={{ height: 250 }}>
            <ImageBackground
              // uri:this.props.navigation.state.params.rowData.featured_media !=0 ? this.props.navigation.state.params.rowData._embedded["wp:featuredmedia"]["0"].source_url : " "
              source={
                this.props.navigation.state.params.rowData.featured_media != 0
                  ? {
                      uri: this.props.navigation.state.params.rowData._embedded[
                        "wp:featuredmedia"
                      ]["0"].source_url
                    }
                  : require("../../image/img_not_found.jpg")
              }
              style={{ flex: 1 }}
            >
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("MainScreen")}
              >
                <Image
                  source={require("../../image/arrowBack.png")}
                  style={{
                    width: 20,
                    height: 20,
                    marginHorizontal: 10,
                    marginVertical: 15
                    // tintColor: "#787D81"
                  }}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>

          <View style={container.marginHorizontal}>
            <View
              style={{ flex: 1, flexDirection: "column", marginVertical: 10 }}
            >
              {/* <Text
                extraStyle={{ fontSize: 18, color: "#041A33" }}
                Text={this.props.navigation.state.params.rowData.title.rendered}
              /> */}
              <HTML
                html={this.props.navigation.state.params.rowData.title.rendered}
                tagsStyles={{
                  resizeMode: "contain"
                }}
                baseFontStyle={{
                  color: "#041A33",
                  fontFamily: fonts.PoppinsSemiBold,
                  fontSize: 18
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 12,
                  justifyContent: "center"
                }}
              >
                <View style={{ flexDirection: "row", flex: 0.7 }}>
                  <View style={{ marginRight: 5 }}>
                    <HTML
                      html={
                        this.props.navigation.state.params.rowData._embedded[
                          "wp:term"
                        ][0][0]["name"]
                      }
                      tagsStyles={{
                        resizeMode: "contain"
                      }}
                      baseFontStyle={{
                        color: "#6E7886",
                        fontFamily: fonts.PoppinsSemiBold,
                        fontSize: 14,
                        justifyContent: "center"
                      }}
                    />
                  </View>
                  <View>
                    <Text
                      extraStyle={{
                        color: "#B5B9BD",
                        fontSize: 11,
                        justifyContent: "center",
                        marginTop: 2
                      }}
                      Text={
                        <TimeAgo
                          time={this.props.navigation.state.params.rowData.date}
                        />
                      }
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 0.3,
                    justifyContent: "center"
                  }}
                >
                  <TouchableOpacity
                    onPress={this._onPressHeartButton.bind(this.state.wpid)}
                  >
                    <View style={{ flex: 0.5 }}>
                      {this.state.isLiked ? (
                        <Icon
                          name="ios-bookmark"
                          size={22}
                          style={{
                            color: "#0099FA",
                            marginLeft: 5,
                            alignSelf: "flex-end"
                          }}
                        />
                      ) : (
                        <Icon
                          name="ios-bookmark-outline"
                          size={22}
                          style={{
                            marginLeft: 5,
                            alignSelf: "flex-end"
                          }}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                  <View style={{ flex: 0.5, justifyContent: "center" }}>
                    <TouchableWithoutFeedback
                      onPress={this._shareTextWithTitle}
                    >
                      <Icon
                        name="ios-share-alt"
                        size={22}
                        style={{
                          color: "#808080",
                          marginRight: 5,
                          alignSelf: "flex-end"
                        }}
                      />
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              </View>
            </View>
            <HTML
              //set Video width
              alterChildren={node => {
                if (node.name === "iframe") {
                  delete node.attribs.width;
                  delete node.attribs.height;
                }
                return node.children;
              }}
              html={this.props.navigation.state.params.rowData.content.rendered}
              staticContentMaxWidth={Dimensions.get("window").width}
              imagesMaxWidth={Dimensions.get("window").width}
              onLinkPress={(evt, href) => {
                Linking.openURL(href);
              }}
              tagsStyles={{
                resizeMode: "contain"
              }}
              baseFontStyle={{
                color: "#041A33",
                fontFamily: fonts.PoppinsRegular
              }}
              ignoredStyles={["height", "width"]}
            />
          </View>
        </ScrollView>
        <AdvertisementBanner adUnitID={config.banner.homeAdID} />
      </View>
    );
  }
}
