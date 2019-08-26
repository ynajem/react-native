import React, { Component } from "react";
import {
  View,
  ListView,
  TouchableOpacity,
  ActivityIndicator,
  Share,
  Image,
  Text,
  RefreshControl
} from "react-native";
import ListViews from "../../Components/ListView/index";
import container from "../../Styles/container";
import Header from "../../Components/HeaderText/index";
import BookMarkShare from "../../Components/BookMarkShare";
import config from "../../Config/index";
import style from "./style";
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: ds,
      length: ""
    };
  }
  static navigationOptions = {
    header: null
  };
  componentDidMount() {
    this.fetchPostList();
  }
  fetchPostList = () => {
    return fetch(
      config.url +
        "wp-json/wp/v2/posts?=100&_embed&categories=" +
        this.props.navigation.state.params.rowData.id
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
          length: responseJson.length
        });
        //  console.log(responseJson[0]._embedded['wp:featuredmedia'][0].source_url);
      })
      .catch(error => {
        console.error(error);
      });
  };
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchPostList().then(() => {
      this.setState({ refreshing: false });
    });
  };
  OpenSecondActivity(rowData) {
    onPressed = this.props.onPressed({
      ListViewClickItemHolder: rowData
    });
  }
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
            style={style.indicator}
            size="large"
          />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Header
          Title={this.props.navigation.state.params.rowData.name}
          source={require("../../image/arrowBack.png")}
          iconStyle={{ marginLeft: 11 }}
          onPressSearch={() => this.props.navigation.navigate("MainScreen")}
        />
        {this.state.length == 0 ? (
          <View
            style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                alignSelf: "center"
              }}
              source={require("../../image/search_not_found.jpg")}
            />

            <Text
              style={{
                fontSize: 18,
                color: "#FF9999",
                textAlign: "center",
                fontWeight: "800",
                alignSelf: "center"
              }}
            >
              Post Not Available
            </Text>
          </View>
        ) : (
          <View style={container.container}>
            <View
              cornerRadius={5}
              cardElevation={2}
              cardMaxElevation={2}
              style={[container.marginHorizontal]}
            >
              <ListView
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                  />
                }
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
                            rowData._embedded["wp:term"]["0"]["0"]["name"]
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
        )}
      </View>
    );
  }
}
