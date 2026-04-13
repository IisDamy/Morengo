import { images } from "@/constants";
import React from "react";
import { View, Text, Pressable, Image, ImageBackground, StyleSheet, TouchableOpacity,  } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay
} from "react-native-reanimated";

const SMALL = 10;
const LARGE = 300;
const DEFAULT = 150;
const RADIUS = 15;
const FULL_RADIUS = 999;

export default function GridAnim() {
  const active = useSharedValue<null | number>(null);

  const createStyle = (index: number) =>
    useAnimatedStyle(() => {
      if (active.value === null) {
        return {
          width:  withTiming(DEFAULT),
          height: withTiming(DEFAULT),
          borderRadius: withTiming(RADIUS),
        };
      }

      const isTop = index === 1 || index === 2;
      const isLeft = index === 1 || index === 3;

      const activeTop = active.value === 1 || active.value === 2;
      const activeLeft = active.value === 1 || active.value === 3;

      const sameRow =
        (isTop && activeTop) || (!isTop && !activeTop);

      const sameCol =
        (isLeft && activeLeft) || (!isLeft && !activeLeft);

      let width = SMALL;
      let height = SMALL;

      if (sameRow) height = LARGE;
      if (sameCol) width = LARGE;

      // determine if this box is the active one
      const isActive = active.value === index;

      // if box is reduced in any dimension → make it fully rounded
      const isReduced = width === SMALL || height === SMALL;

      return {
        width: withDelay(300,withTiming(width, { duration: 150 })),
        height: withDelay(300,withTiming(height, { duration: 150 })),
        borderRadius: withDelay(500,withTiming(
          isActive ? RADIUS : isReduced ? FULL_RADIUS : RADIUS,
          { duration: 100 })
        ),
      };
    });

  const box1 = createStyle(1);
  const box2 = createStyle(2);
  const box3 = createStyle(3);
  const box4 = createStyle(4);
// image3 too sharp, replace latter

  return (
    <View className="mt-10 p-2 gap-2">
      <View className="flex-row gap-2">
        
        <Pressable
          onPressIn={() => (active.value = 1)}
          onPressOut={() => (active.value = null)}
        >
          <Animated.View style={box1} className={'overflow-hidden'} >
            
            <ImageBackground className="w-[300] absolute h-[300]" source={images.customdelivery}/>
            <View className="w-[200] border border-green-300 h-[200] rounded-full top-[-90] opacity-[95%] relative right-[-180] bg-orange-500 "/>
            <Text className="z-2 w-[300] text-right p-3 absolute text-white top-0"
             style={styles.textPop}
             >ORDER ANYTHING, 
             {"\n"}
             ANYWHERE
             {"\n"}
             FROM ANYONE,
            {"\n"}
            Just say it
             </Text>
          </Animated.View>

        </Pressable>
        


        <Pressable
          onPressIn={() => (active.value = 2)}
          onPressOut={() => (active.value = null)}
          
        >
          <Animated.View style={box2} className="overflow-hidden " >
            <ImageBackground  className="w-[300] right-0 absolute h-[300]" source={images.businesslady}/>
            <View className="w-[100] h-[100]  absolute top-0 right-0 bg-orange-500 "/>
                <Text className="z-2 w-[150] text-left right-[50] absolute p-3 text-white top-["
             style={styles.textPop}
             >Indulge in local delicacies
             </Text>
          </Animated.View>
        </Pressable>
      </View>

      <View className="flex-row gap-2">
        <Pressable
          onPressIn={() => (active.value = 3)}
          onPressOut={() => (active.value = null)}
        >
          <Animated.View style={box3} className="bg-zinc-200 overflow-hidden items-center" >
            <ImageBackground className="w-[300] left-0 absolute bottom-[0] h-[300]" source={images.womaneatschicken}/>
             <Text className="z-2 h-[300]  rotate-90  top-0 absolute p-3 text-white "
             style={styles.textPop}
             >Indulge in local delicacies
             </Text>
          </Animated.View>
        </Pressable>

        <Pressable
          onPressIn={() => (active.value = 4)}
          onPressOut={() => (active.value = null)}
        >
          <Animated.View style={box4} className="bg-zinc-200 overflow-hidden" >
            <ImageBackground className="w-[300] right-0 absolute bottom-[0] h-[300]" source={images.womaneatschicken}/>
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}




const styles = StyleSheet.create({
  textPop: {
    fontFamily: "Crispy",
    color: "#FF6B35", // Replace with your actual morange color value
    letterSpacing: 0,
    textShadowColor: "#71717a", // zinc color
    textShadowOffset: { width: -0.5, height: 0.5 },
    textShadowRadius: 0.6,
  },
});