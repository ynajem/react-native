import React, { Component } from "react";
import {
  View,
  ListView,
  TouchableOpacity,
  Image,
  Platform,
  TextInput,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import container from "../../Styles/container";
import { fonts } from "../../utils/fonts";
import renderIf from "../../utils/renderIf";
import Text from "../../Components/TextMedium/index";
import HTML from "react-native-render-html";
import List from "../../Components/List/index";
import style from "./style";
import config from "../../Config/index";
import Icon from "react-native-vector-icons/Ionicons";
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
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
   this.fetchList();
  }
  fetchList=()=>{
    return fetch(config.url + "wp-json/wp/v2/categories?per_page=100&_embed")
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(responseJson)
      });
    })
    .catch(error => {
      console.error(error);
    });
  }
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchList().then(() => {
      this.setState({ refreshing: false });
    });
  };
  static navigationOptions = {
    header: null
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
      <View style={{ flex: 1 }}>
        {/* <Header Title="Categories" source={require("../../image/search.png")} /> */}
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
                    html="Categories"
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  flex: 1
                }}
              >
                <View style={{ justifyContent: "center", marginLeft: 8 }}>
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
        <View>
          <View
            cornerRadius={5}
            cardElevation={2}
            cardMaxElevation={2}
            style={{ marginBottom: 120 }}
          >
            <ListView
              // style={{flex:1}}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                />
              }
              dataSource={this.state.dataSource}
              showsVerticalScrollIndicator={false}
              renderRow={rowData => (
                <List
                  Title={rowData.name}
                  onPress={() =>
                    this.props.navigation.navigate("PostList", { rowData })
                  }
                />
              )}
            />
          </View>
        </View>
      </View>
    );
  }
}
