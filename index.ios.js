import React, { Component } from "react";
import { AppRegistry, Text, View, StyleSheet, StatusBar } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import Highlight from "react-native-highlight-words";

import { fetchWeather } from "./weatherAPI";

const iconNames = {
  Clear: "ios-sunny",
  Rain: "ios-rainy",
  Thunderstorm: "ios-thunderstorm",
  Clouds: "ios-cloudy",
  Mist: "ios-cloudy",
  Snow: "ios-snow",
  Drizzle: "ios-umbrella"
};

const phrases = {
  Clear: {
    title: "It's Fucking Amaze Balls",
    subtitle: "Rock that shit!",
    highlight: "Fucking",
    color: "#E32500",
    background: "#FFDD44"
  },
  Rain: {
    title: "Rain Rain, Go Away",
    subtitle: "Stay inside and chill all day",
    highlight: "Away",
    color: "#004A96",
    background: "#2F343A"
  },
  Thunderstorm: {
    title: "Fucking Thunderstrike",
    subtitle: "Unplug your shit",
    highlight: "Thunderstrike",
    color: "#FBFF46",
    background: "#020202"
  },
  Clouds: {
    title: "Cloudy As Fuck",
    subtitle: "Looks depressing as fuck outside",
    highlight: "Cloudy",
    color: "#0044FF",
    background: "#939393"
  },
  Mist: {
    title: "Foggy As Fuck",
    subtitle: "I can't see shit",
    highlight: "Fuck",
    color: "#0044FF",
    background: "#939393"
  },
  Snow: {
    title: "Brain Fucking Freeze",
    subtitle: "You ain't supposed to eat it",
    highlight: "Fucking",
    color: "#021D4C",
    background: "#15A678"
  },
  Drizzle: {
    title: "Lightweight Ass Rain",
    subtitle: "Sky's tryna hold back its tears",
    highlight: "Ass",
    color: "#B3F6E4",
    background: "#1FBB68"
  }
};

class App extends Component {
  componentWillMount() {
    this.state = {
      hideStatusBar: false,
      temp: 0,
      weather: "Clear"
    };
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      posData =>
        fetchWeather(
          posData.coords.latitude,
          posData.coords.longitude
        ).then(res => {
          this.setState({
            temp: Math.round(res.temp),
            weather: res.weather
          });
          console.log(res);
        }),
      error => alert(error),
      { timeout: 10000 }
    );
  }

  render() {
    console.log("Component is rendering");
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: phrases[this.state.weather].background }
        ]}
      >
        <StatusBar hidden={true} />
        <View style={styles.header}>
          <Icon
            name={iconNames[this.state.weather]}
            size={80}
            color="#ffffff"
          />
          <Text style={styles.temp}>{this.state.temp}°</Text>
        </View>
        <View style={styles.body}>
          <Highlight
            style={styles.title}
            highlightStyle={{ color: phrases[this.state.weather].color }}
            searchWords={[phrases[this.state.weather].highlight]}
            textToHighlight={phrases[this.state.weather].title}
          />
          <Text style={styles.subtitle}>
            {phrases[this.state.weather].subtitle}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffdd44"
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
    // backgroundColor: "#44ddff"
  },
  temp: {
    fontFamily: "HelveticaNeue-Bold",
    fontSize: 45,
    color: "#ffffff"
  },
  body: {
    flex: 6,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    // backgroundColor: "#ffdd44",
    margin: 10
  },
  title: {
    fontFamily: "HelveticaNeue-Bold",
    fontSize: 78,
    // lineHeight: 78,
    color: "white",
    marginBottom: 5
  },
  subtitle: {
    fontFamily: "HelveticaNeue-Medium",
    fontSize: 16,
    color: "white"
  }
});

AppRegistry.registerComponent("ReactNativeWeatherApp", () => App);
