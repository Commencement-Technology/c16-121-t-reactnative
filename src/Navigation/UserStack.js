import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../Screens/Profile";
import Home from "../Screens/Home";
import DonationForm from "../Screens/DonationForm";
import Login from "../Screens/Login";
import MyTabs from "./Tabs";
import { NavigationContainer } from "@react-navigation/native";
const UserStack = createStackNavigator();

export default function MyStack() {
  return (
    <NavigationContainer>
      <UserStack.Navigator
        initialRouteName="Tabs"
        screenOptions={{
          headerShown: false,
          style:{
            position:'absolute',
            bottom: 0, 
            left: 0,
            right: 0,
          }
        }}
      >
        <UserStack.Screen name="Tabs" component={MyTabs} />
        <UserStack.Screen name="Root" component={Home} />
        <UserStack.Screen name="Profile" component={Profile} />
        <UserStack.Screen name="DonationForm" component={DonationForm} />
        <UserStack.Screen name="Login" component={Login} />
      </UserStack.Navigator>
    </NavigationContainer>
  );
}