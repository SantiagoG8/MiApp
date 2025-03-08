import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SplashScreen from "../screens/SplashScreen";
import UserScreen from "../screens/UserScreen";
import Modulos from "../screens/Modulos";
import Videos from "../screens/Videos";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ 
                    
                    
                }} 
            />
            <Tab.Screen 
                name="Usuarios" 
                component={UserScreen} 
                options={{ 
                    
                }} 
            />

            <Tab.Screen 
                name="Modulos" 
                component={Modulos} 
                options={{ 
                    
                }}
            />
            <Tab.Screen 
                name="Videos" 
                component={Videos} 
                options={{ 
                    
                }}
            />
            
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
                name="MainTabs" 
                component={TabNavigator} 
                options={{ headerShown: false }} 
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;
