import AppNavigator from './src/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import { AuthProvider } from './src/Context/AuthContext'; 
import { registerForPushNotificationsAsync } from './src/services/NotificationService';
import * as Notifications from 'expo-notifications';
import React, { useEffect } from 'react';


export default function App() {

  useEffect(() => {
    // Registrar notificaciones al iniciar la aplicación
    const setupNotifications = async () => {
      const token = await registerForPushNotificationsAsync();
      console.log('Token de notificación:', token);
 
      // Evento para manejo notificaciones recibidas
      const subscription = Notifications.addNotificationReceivedListener(notification => {
        console.log('Notificación recibida:', notification);
      });
 
      return () => subscription.remove();
    };
 
    setupNotifications();
  }, []);
  
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
        <FlashMessage position="top" />
      </NavigationContainer>
    </AuthProvider>
  );
  
}
