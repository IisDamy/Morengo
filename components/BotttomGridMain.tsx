import { images } from "@/constants";
import React from "react";
import { View, Text, Pressable, Image, ImageBackground, StyleSheet, TouchableOpacity,  } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay
} from "react-native-reanimated";
import { color } from "@/constants";
const SMALL = 60;
const LARGE = 250;
const DEFAULT = 160;
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
    <View className=" gap-2">
      <View className="flex-row gap-2">
        
        <Pressable
          onPressIn={() => (active.value = 1)}
          onPressOut={() => (active.value = null)}>
          <Animated.View style={box1} className={'overflow-hidden '}>  
            <ImageBackground className="w-[300] absolute h-[300]" source={images.customdelivery}/>
            <Text className="z-2 text-center w-[100] mx-auto my-auto text-white "
             style={styles.textPop}>
             make a CUSTOM ORDER
             </Text>
          </Animated.View>
        </Pressable>
        


        <Pressable
          onPressIn={() => (active.value = 2)}
          onPressOut={() => (active.value = null)}>
          <Animated.View style={box2} className="overflow-hidden " >
            <ImageBackground  className="w-[300] right-0 absolute h-[300]" source={images.businesslady}/>
            <Text className="z-2 text-center w-[100] my-auto mx-auto text-white "
             style={styles.textPop}>
              Create a vendor
             </Text>
          </Animated.View>
        </Pressable>
      </View>

      <View className="flex-row gap-2">
        <Pressable
          onPressIn={() => (active.value = 3)}
          onPressOut={() => (active.value = null)}>
          <Animated.View style={box3} className="bg-zinc-200 overflow-hidden" >
            <ImageBackground className="w-[300] left-0 absolute bottom-[0] h-[300]" source={images.womaneatschicken}/>
            <Text className="z-2 text-center w-[100] mx-auto my-auto text-white "
             style={styles.textPop}>
              become a rider
             </Text>
          </Animated.View>
        </Pressable>

        <Pressable
          onPressIn={() => (active.value = 4)}
          onPressOut={() => (active.value = null)}
        >
          <Animated.View style={box4} className="bg-zinc-200 overflow-hidden" >
            <ImageBackground className="w-[300] right-0 absolute bottom-[0] h-[300]" source={images.womaneatschicken}/>
            <Text className="z-2 text-center w-[100] mx-auto my-auto text-white "
             style={styles.textPop}>
              CUSTOM ORDER
             </Text>
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}




const styles = StyleSheet.create({
  textPop: {
    fontSize: 16,
    fontFamily: "Crispy",
    lineHeight: 20,
    color: color.morange, // Replace with your actual morange color value
    letterSpacing: 0,
    textShadowColor: "#0e0e11", // zinc color
    textShadowOffset: { width: -0.5, height: 0.5 },
    textShadowRadius: 0.6,
  },
});