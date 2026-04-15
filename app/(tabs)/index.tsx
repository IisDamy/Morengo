import { MenuFavouritePanel, MenuVendorPanel, NotificationBell, LocationChangeButton, PointsIcon} from "@/components";
import { color, images } from "@/constants";
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
  View,
  Image,
  ImageBackground
 
} from "react-native";
import Animated from "react-native-reanimated";
import { router } from "expo-router";
import { useEffect } from "react";
import GridAnim from "@/components/BotttomGridMain";


export default function Index() {
  const { onScroll } = useTabBarVisibility();
  const [seeAll, toggleSeeAll] = useState(false);




  return (
    <SafeAreaView className=" h-fit pb-0 items-center" style={{ flex: 1 }}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
       
        
      />
      <View className="h-screen w-full "
        style={{
          backgroundColor:'#F8F8F8'
        }}
      >
       
        <Animated.ScrollView
          className="w-[100%] pb-0 h-fit"
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
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

            {/* background imgs */}
            <View className="items-center flex absolute bottom-[0] h-[200] w-screen ">
              <ImageBackground source={images.milkshake} tintColor={'white'} resizeMode="cover"  className="w-[300] h-[300] rotate-[-30deg] absolute   z-4" />
              <ImageBackground source={images.fruit} tintColor={'white'} resizeMode="cover"  className="w-[80] h-[80]  absolute  top-[10] z-4" />
              <ImageBackground source={images.sodaCup} tintColor={'white'} resizeMode="cover"  className="w-[300] h-[300] rotate-[30deg] absolute   z-4" />
              <ImageBackground source={images.plate} tintColor={'white'} resizeMode="cover"  className="w-[150] p-0 h-[150] rotate-[90deg] absolute top-10 left-[75]  z-4" />
              <ImageBackground source={images.vine2} tintColor={'white'} resizeMode="cover"  className="w-[150] h-[150] rotate-[60deg] absolute top-[-50] left-[200]  z-4" 
                style={{
                  transform:'rotateY(180deg) rotateZ(60deg)'
                }}
              />
              <ImageBackground source={images.vine2} tintColor={'white'} resizeMode="cover"  className="w-[150] h-[150] absolute top-[-50] right-[200]  z-4" />
            </View>
            
            {/* turn this text to image cos we're going to design it */}
            <View
              className="flex flex-col 
             w-full items-center gap-4  mt-12"
            >

              {/* location, score and alert */}
              <View className="w-full flex justify-between relative bottom-[2] flex-row  h-fit">

                <LocationChangeButton />
                <View className="mr-2 flex flex-row gap-8 items-center">

                  {/* this will be animation like dashboard smiley face, with periodic animation */}
                  <PointsIcon points={20}/>
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
          
          <View className="w-full pt-4 pb-0 mb-0 relative top-[-160] items-center h-fit px-6 ">
    
            <View className="flex flex-row w-full justify-between">
              <Text className="font-bold tracking-wider">Favourite</Text>
              <TouchableOpacity onPress={() => toggleSeeAll((prev) => !prev)}>
                <Text className="text-green-300 tracking-wider text-sm font-bold">
                  See more
                </Text>
              </TouchableOpacity>
            </View>

            <MenuFavouritePanel seeAll={seeAll} />
            {/* <MenuVendorPanel /> */}

            
            <View className=" h-full  mx-4 pt-10  bg-[#F8F8F8] items-center"
             
            >
            {/* <Text  className="text-lg  mb-8"
            style={{ 
                        fontFamily: "Crispy",
                        color: color.morange,
                        letterSpacing: 0,
                        textShadowColor: "zinc",
                        textShadowOffset: { width: -0.5, height: 0.5 },
                        textShadowRadius: 0.6,
                      }}
            >ORDER ANYTHING NOW!!</Text> */}
   
   
            <GridAnim/>
          </View>
          </View>
         
        </Animated.ScrollView>
     
      </View>
      
    </SafeAreaView>
  );
}
