import React, { Component } from "react";
import {
  View,
  ListView,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Image,
  RefreshControl
} from "react-native";
import ListViews from "../../Components/ListView/index";
import container from "../../Styles/container";
import Header from "../../Components/HeaderText/index";
import BookMarkShare from "../../Components/BookMarkShare/index";
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
   this.fetchSearchList();
  }
  fetchSearchList=()=>{
    console.log(this.props.navigation.state.params.text);
    return fetch(
      config.url +
        "wp-json/wp/v2/posts?per_page=30&_embed&order=asc&search=" +
        this.props.navigation.state.params.text
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
          length: responseJson.length
        });
        console.log("data source length");
        console.log(responseJson.length);
      })
      .catch(error => {
        console.error(error);
      });
  }
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchSearchList().then(() => {
      this.setState({ refreshing: false });
    });
   
  };
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
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Header
          Title="Search Result"
          source={require("../../image/arrowBack.png")}
          iconStyle={{ marginLeft: 11 }}
          onPressSearch={() => this.props.navigation.navigate("MainScreen")}
        />
        {this.state.length == 0 ? (
          <View
            style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
          >
            <Image
              style={{ width: 100, height: 100, alignSelf: "center" }}
              source={require("../../image/search_not_found.jpg")}
            />

            <Text
              style={{
                fontSize: 18,
                color: "#FF9999",
                textAlign: "center",
                fontWeight: "800"
              }}
            >
              Search Result not Found
            </Text>
          </View>
        ) : (
          <View style={container.container}>
            {/* <Text>not Found</Text> */}
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
                          // Categories={rowData.category_arr[0].name}
                          // Title={rowData.title.rendered}
                          // source={{ uri: rowData.featured_image_link }}
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
                      <BookMarkShare
                        Time={rowData.date}
                        onPressBookmark={() =>
                          this.props.navigation.navigate("Home")
                        }
                      />
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
          </View>
        )}
      </View>
    );
  }
}
