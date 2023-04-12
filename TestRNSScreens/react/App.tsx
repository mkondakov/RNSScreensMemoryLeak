import React from "react";
import {
  StyleSheet,
  View,
  Button
} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MapComponent from "./src/MapComponent";

const HomeScreen = ({navigation}) => (
  <View style={{flex: 1}}>
    <Button
      title="Go to Details"
      onPress={() => navigation.navigate("Details")}
    />
    <MapComponent/>
  </View>
);

const DetailsScreen = () => (
  <View style={{flex: 1}}>
    <MapComponent/>
  </View>
);

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{title: "Home"}}/>
        <Stack.Screen name="Details" component={DetailsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
