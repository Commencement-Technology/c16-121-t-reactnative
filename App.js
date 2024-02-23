import * as React from "react";
import { View, StyleSheet, SplashScreen } from "react-native";
import Navigation from "./src/Navigation/Tabs";
import {Amplify, Hub, AuthModeStrategyType } from "aws-amplify";
import config from './src/aws-exports'; 
import { AuthProvider } from './src/Context/AuthContext';
import Background from "./src/Components/Background";
import Login from "./src/Screens/Login";
import 'react-native-gesture-handler';
import Stack from './src/Navigation/UserStack';
import RootNavigation from "./src/Navigation/RootNavigation";
import LoadingScreen from "./src/Screens/Loading";
import FileCaro from "./fileDePruebaCaro";

Amplify.configure({
  ...config,
  Analytics: { disabled: true },
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});




export default function App() {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const listener = (data) => {
    switch (data.payload.event) {
      case "signIn":
        const { attributes } = data.payload.data;
        setUser(attributes);
        break;
      default:
        break;
    }
  };


  React.useEffect(() => {
    Hub.listen("auth", listener);
    return () => Hub.remove("auth", listener);
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <AuthProvider>
      <View style={styles.container}>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <RootNavigation />
            <Background />
          </>
        )}
      </View>
    </AuthProvider>
  );
}
