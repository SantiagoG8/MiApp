import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SplashScreen from "../screens/SplashScreen";
import UserScreen from "../screens/UserScreen";
import Modulos from "../screens/Modulos";
import Videos from "../screens/Videos";
import { Ionicons } from "@expo/vector-icons";
import LoginScreen from "../screens/auth/loginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
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
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#0077B6',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { backgroundColor: '#F8FAFC' },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Usuarios" component={UserScreen} />
            <Tab.Screen name="Modulos" component={Modulos} />
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
        </Stack.Navigator>
    );
};

export default AppNavigator;
