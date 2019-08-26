import React, { Component } from "react";
import { Text, View, ListView, TouchableOpacity } from "react-native";
import container from "../../Styles/container";
import Categories from "../../Components/CategoriesList/index";
import Header from "../../Components/HeaderText/index";
import List from "../../Components/List/index";
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      dataSource: ds
    };
  }
  componentDidMount() {
    return fetch(
      "http://itechnotion.in/wp-news/wp-json/wp/v2/categories?per_page=100"
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log("response:" + responseJson);
        this.setState(
          {
            isLoading: false,
            dataSource: ds.cloneWithRows(responseJson)
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  OpenSecondActivity(rowData) {
    // onPressed = this.props.onPressed({
    //   ListViewClickItemHolder: rowData
    // });
    this.props.navigation.push("Details", { rowData });
  }
  renderRows(rowData) {
    return (
      // <TouchableHighlight onPress={()=>{this.onPress(user)} } >
      // <View style={styles.row}>
      //   <Text style={styles.rowText}> {user.name} </Text>

      // </View>
      // </TouchableHighlight>
      <TouchableOpacity
        style={{ flexDirection: "row", flex: 1 }}
        onPress={this.OpenSecondActivity(rowData)}
      >
        <List Title={rowData.name} />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View>
        <Header Title="Categories" />
        <View style={container.marginHorizontal}>
          {/* <Categories onPress={()=>this.props.navigator.push({})}/> */}
          <View
            cornerRadius={5}
            cardElevation={2}
            cardMaxElevation={2}
            style={{ marginBottom: 50 }}
          >
            <ListView
              dataSource={this.state.dataSource}
              showsVerticalScrollIndicator={false}
              renderRow={rowData => (
                // <TouchableOpacity
                //   style={{ flexDirection: "row", flex: 1 }}
                //   onPress={this.OpenSecondActivity(rowData)}
                // >
                  <List Title={rowData.name} onPress={this.OpenSecondActivity(rowData)} />
                //</TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>
    );
  }
}
