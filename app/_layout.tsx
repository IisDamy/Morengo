import { Stack} from "expo-router";
import './globals.css'
import * as Sentry from '@sentry/react-native';
import { useFonts } from "expo-font";
import { useEffect } from "react";
import useAuthStore from "@/store/auth.store";
import * as SplashScreen from 'expo-splash-screen'
import { GestureHandlerRootView } from "react-native-gesture-handler";



Sentry.init({
  dsn: 'https://091d6dc0e833f31b86fe46c82e15794d@o4510487902027776.ingest.us.sentry.io/4510726290800640',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});




export default Sentry.wrap(function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
     "Crispy": require("../assets/fonts/Crispy.otf"),
  })
  const {isLoading, fetchAuthenticatedUser} = useAuthStore();

 

 useEffect(() => {
    // splash screen should not be hidden and should show before app loads
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
    
  }, [fontsLoaded, error]);

  useEffect(()=>{   
    fetchAuthenticatedUser()
    
  },[])



  if(isLoading && !fontsLoaded) return null;

 
  return (
  <GestureHandlerRootView style={{flex:1}}>
  <Stack screenOptions={{headerShown: false}}/>
  </GestureHandlerRootView>
   

  );



});


