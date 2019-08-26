import React, { Component } from "react";
import {
  View,
  ScrollView,
  ListView,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Image,
  Text,
  TextInput,
  Share,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import styles from "./style";
import container from "../../Styles/container";
import TextBold from "../../Components/TextBold/index";
import TextMedium from "../../Components/TextMedium/index";
import TimeAgo from "react-native-timeago";
import truncate from "truncate-html";
import ListViews from "../../Components/ListView/index";
import renderIf from "../../utils/renderIf";
import HTML from "react-native-render-html";
import { fonts } from "../../utils/fonts";
import BookMarkShare from "../../Components/BookMarkShare";
import config from "../../Config/index";
import Icon from "react-native-vector-icons/Ionicons";
import AdvertisementBanner from "../AdBanner/index";
import Config from "../../Config/index";
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //API data store
      dataSource: ds,
      data: ds,
      isLoading: true,
      //search value store
      status: true,
      status2: false,
      text: "",
      url: "",
      image: "",
      refreshing: false
    };
  }
  SearchClickStatus() {
    this.setState({
      status: !this.state.status,
      status2: !this.state.status2
    });
    console.log("toggle button handler: " + this.state.status);
    console.log("toggle button handler2: " + this.state.status2);
  }
  componentDidMount() {
    this.fetchNews();
  }
  fetchNews = () => {
    this.FeatureNews();
    this.LatestNews();
  };
  FeatureNews = () => {
    return fetch(config.url + "wp-json/wp/v2/posts?categories=23&_embed")
      .then(response => response.json())
      .then(responseJson => {
        console.log("response1:");
        console.log(responseJson);
        if (responseJson != null) {
          this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(responseJson)
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  LatestNews = () => {
    return fetch(config.url + "wp-json/wp/v2/posts?per_page=5&_embed")
      .then(response => response.json())
      .then(responseJson => {
        console.log("response2:");
        console.log(responseJson);

        if (responseJson != null) {
          this.setState({
            isLoading: false,
            data: ds.cloneWithRows(responseJson),
            url: responseJson.link
          });
          if (this.state.data != null) {
            console.log("==============>");
            console.log(this.state.data);

            // image:responseJson[0]._embedded["wp:featuredmedia"]["0"].source_url
          }
        }
        //console.log(responseJson[0]._embedded['wp:term'][0][0]['name']);
      })
      .catch(error => {
        console.error(error);
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
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.FeatureNews().then(() => {
      this.setState({ refreshing: false });
    });
    this.LatestNews().then(() => {
      this.setState({ refreshing: false });
    });
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
    const tagsStyles = {
      lineHeight: 1.5
    };
    const baseFontStyle = {
      color: "#041A33",
      fontFamily: fonts.PoppinsSemiBold,
      fontSize: 16,
      textAlign: "justify",
      textAlignVertical: "center",
      padding: 5
    };
    return (
      <View style={{ flex: 1 }}>
        {/* <Header
          //onPressSearch={() => this.props.navigation.navigate("Search")}
          onSubmitEditing={()=>this.props.navigation.navigate("SearchCategoriesList")}
        /> */}
        <View
          style={[
            styles.mainView,
            this.props.extraStyle,
            { marginTop: Platform.OS == "ios" ? 20 : 0 }
          ]}
        >
          <View style={{ flex: 0.1, justifyContent: "center" }}>
            <TouchableOpacity onPress={() => this.SearchClickStatus()}>
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
                {/* set title using Text */}
                <Text
                  style={{
                    color: "#787D81",
                    alignSelf: "center",
                    fontSize: 18,
                    justifyContent: "center",
                    fontWeight: "500"
                  }}
                >
                  <Text style={{ color: "#4A84FC" }}>W</Text>
                  <Text style={{ color: "#E64D37" }}>e</Text>
                  <Text style={{ color: "#FAC700" }}>b</Text>
                  <Text style={{ color: "#508DFC" }}>i</Text>
                  <Text style={{ color: "#4AB24D" }}>l</Text>
                  <Text style={{ color: "#E64D37" }}>e</Text>
                  <Text style={{ color: "#606369" }}> News</Text>
                </Text>

                {/* set Title using Image icon */}
                {/* <Image style={{alignSelf:'center'}} source={require("../../image/title_home.png")} /> */}

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
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
          <View>
            {/* Fetch FeatureNews */}
            <View>
              <ListView
                dataSource={this.state.dataSource}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderRow={rowData => (
                  <View style={styles.itemContainer}>
                    <TouchableOpacity
                      style={{ flex: 1, flexDirection: "column" }}
                      onPress={() =>
                        this.props.navigation.navigate("Details", { rowData })
                      }
                    >
                      <ImageBackground
                        source={
                          rowData.featured_media != 0
                            ? {
                                uri:
                                  rowData._embedded["wp:featuredmedia"]["0"]
                                    .source_url
                              }
                            : require("../../image/img_not_found.jpg")
                        }
                        style={styles.imageWrapper}
                        imageStyle={{ borderRadius: 10 }}
                      />
                      <View style={{ flex: 1, justifyContent: "flex-start" }}>
                        {/* <TextSemiBold
                          numberOfLines={2}
                          extraStyle={styles.ListContentText}
                          Text={rowData.title.rendered}
                        /> */}
                        <View style={styles.ListContentText}>
                          <HTML
                            html={truncate(rowData.title.rendered, {
                              length: 45,
                              stripTags: true
                            })}
                            tagsStyles={tagsStyles}
                            allowFontScaling
                            baseFontStyle={baseFontStyle}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>

            {/* Fetch LatestNews */}
            <View style={container.marginHorizontal}>
              <TextBold extraStyle={styles.Title} Text="Latest update" />
              <View
                cornerRadius={5}
                cardElevation={2}
                cardMaxElevation={2}
                style={{ marginTop: 15, marginBottom: 50 }}
              >
                <ListView
                  showsVerticalScrollIndicator={false}
                  dataSource={this.state.data}
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
                          <BookMarkShare Time={rowData.date} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <AdvertisementBanner
          adUnitID={Config.banner.homeAdID}
          style={{ marginBottom: 47 }}
        />
      </View>
    );
  }
}
