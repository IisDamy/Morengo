import { MenuFavouritePanel, MenuVendorPanel, NotificationBell, LocationChangeButton, PointsIcon } from "@/components";
import { color } from "@/constants";
import { useTabBarVisibility } from "@/contexts/TabBarVisibilityContext";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Animated from "react-native-reanimated";
import { router } from "expo-router";

export default function Index() {
  const { onScroll } = useTabBarVisibility();
  const [seeAll, toggleSeeAll] = useState(false);


  return (
    <SafeAreaView className=" h-fit pb-0 items-center" style={{ flex: 1 }}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={"#1b0707"}
        translucent
      />
      <View className="h-screen  w-full "
        style={{
          backgroundColor:'#F8F8F8'
        }}
      >
       
        <Animated.ScrollView
          className="w-[100%] pb-0 h-fit"
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          {/* header */}
          <View
            className={`header  flex justify-center pt-[60] px-[148] overflow-hidden items-center rounded rounded-[130%] self-center h-[360] w-[170%] relative top-[-160]`}
            style={{
              backgroundColor: color.moregreen,
            }}
          >
            {/* maybe radial  */}
            <LinearGradient
              className="w-screen absolute bottom-[-10] h-[230] "
              colors={[color.moregreen, color.morange]}
            />
            {/* turn this text to image cos we're going to design it */}
            <View
              className="flex flex-col 
             w-full items-center gap-4  mt-12"
            >

              {/* location, score and alert */}
              <View className="w-full flex justify-between relative bottom-[5] flex-row  h-fit">

                <LocationChangeButton />
                <View className="mr-2 flex flex-row gap-8 items-center">

                  {/* this will be animation like dashboard smiley face, with periodic animation */}
                  <PointsIcon />
                 <NotificationBell />
                </View>
              </View>


              {/* logo */}
              <Text
                className="text-xl relative bottom-[7]"
                style={{
                  fontFamily: "Crispy",
                  color: color.morange,
                  letterSpacing: 0,
                  textShadowColor: "white",
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 0.6,
                }}
              >
                morengo
              </Text>
                  
              <Pressable onPress={()=> router.push('/(screens)/SearchPage')}>
                <View className="relative  flex flex-row top-[12] bg-white px-3 w-[135] items-center rounded-[10] h-10 rounded">
                  <Ionicons
                    name="search-outline"
                    size={14}
                    color="gray"
                    className="mr-[2] relative"
                  />
                  <Text className=" text-zinc-400 ">search...</Text>
                </View>
              </Pressable>
            </View>
          </View>
          {/* main */}
          <View className="w-full pt-4 pb-0 mb-0 relative top-[-160] h-fit px-6 ">
            <View className="flex flex-row justify-between">
              <Text className="font-bold tracking-wider">Favourite</Text>
              <TouchableOpacity onPress={() => toggleSeeAll((prev) => !prev)}>
                <Text className="text-orange-300 tracking-wider text-sm font-bold">
                  See all
                </Text>
              </TouchableOpacity>
            </View>

            <MenuFavouritePanel seeAll={seeAll} />
            <MenuVendorPanel />

            
            <View className="mt-12 w-full  h-[100] rounded-[30]">
            <Text>ORDER ANYTHING NOW!!</Text>
            <Text>MORENGO</Text>
            
          </View>
          </View>
          
        </Animated.ScrollView>
     
      </View>
      
    </SafeAreaView>
  );
}
