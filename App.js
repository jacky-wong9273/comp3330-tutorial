import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { createContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import "react-native-gesture-handler";
import {
  PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  MD3DarkTheme as PaperDarkTheme,
  Text,
  Button,
  useTheme,
} from "react-native-paper";

const MyLightTheme = {
  ...PaperDefaultTheme,
  primary: "#ff0000",
};

const MyDarkTheme = {
  ...PaperDarkTheme,
  primary: "#6767fe",
};

export default function App() {
  const { colors } = useTheme();
  const ThemeContext = createContext({
    isDarkTheme: false,
    toggleTheme: () => {},
    theme: {},
  });
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);
  const Stack = createStackNavigator();
  const HomeScreen = () => (
    <View style={styles.root}>
      <Text>This is COMP3330-Tutorial on Theme Construction</Text>
      <Button onPress={toggleTheme} style={{ backgroundColor: colors.primary }}>
        <Text>Change Theme</Text>
      </Button>
      <StatusBar style="auto" />
    </View>
  );
  const Router = () => (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <NavigationContainer theme={!isDarkTheme ? DefaultTheme : DarkTheme}>
        <PaperProvider theme={!isDarkTheme ? MyLightTheme : MyDarkTheme}>
          <Router />
        </PaperProvider>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
