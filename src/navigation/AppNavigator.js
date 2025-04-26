import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Badge } from 'react-native-paper'; 
import { View } from 'react-native'; 
import HomeScreen from "../screens/HomeScreen";
import SplashScreen from "../screens/SplashScreen";
import UserScreen from "../screens/UserScreen";
import Modulos from "../screens/Modulos";
import Videos from "../screens/Videos";
import LoginScreen from "../screens/auth/loginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import SettingsScreen from "../screens/SettingsScreen"; 
import Notificaciones from "../screens/Notificaciones";
import * as Notifications from 'expo-notifications';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  const [notificationCount, setNotificationCount] = useState(0); 

  useEffect(() => {
    
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      setNotificationCount(prevCount => prevCount + 1); 
    });

    
    return () => {
      
      Notifications.removeNotificationSubscription(subscription);
    };
  }, []); 

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Usuarios") {
            iconName = "person-outline"; 
          } else if (route.name === "Modulos") {
            iconName = "folder-outline"; 
          } else if (route.name === "Videos") {
            iconName = "videocam-outline"; 
          } else if (route.name === "Notificaciones") {
            iconName = "notifications-outline"; 
          }

          return (
            <View style={{ position: 'relative' }}>
              <Ionicons name={iconName} size={size} color={color} />
              {route.name === "Notificaciones" && notificationCount > 0 && (
                <Badge
                  style={{
                    position: 'absolute',
                    top: -6,
                    right: -6,
                    backgroundColor: 'red',
                  }}
                >
                  {notificationCount}
                </Badge>
              )}
            </View>
          );
        },
        tabBarActiveTintColor: '#0077B6',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#F8FAFC' },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Usuarios" component={UserScreen} />
      <Tab.Screen name="Modulos" component={Modulos} />
      <Tab.Screen name="Notificaciones" component={Notificaciones} />
      <Tab.Screen name="Videos" component={Videos} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Ajustes" }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
