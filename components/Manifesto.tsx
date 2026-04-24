import { View, TouchableOpacity, Text, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useEffect, useState, useRef } from 'react';
import { splitIntoLines } from '@/hooks/useLineSplit';
import { color } from '@/constants';
import { Svg, TSpan, Text as SvgText ,Stop,Rect, Mask, Defs, Circle, LinearGradient, CircleProps } from 'react-native-svg';
import { ManifestoProps } from '@/types';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
// after bubble minimizes display turns to none
// bubble should open wherever user touches screen
// and can be moved around with finger also inticiating scroll as finger reaches to end of page
// Make font size large as fx
// user should have to scrool

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const {width, height} = Dimensions.get('window');

const Manifesto = ({whatIs, openDashboard}:ManifestoProps) => {
const text = `The idea of morengo came to me in my final year, I encountered many difficulties that affected both my social and academic life, a lot of things started to unravel almost opportunistically like they've been waiting on me, but moving on, I consider my self a natural problem solver, and having a good amount of time on my hand i decided to test my self and see if i can build something that has real world value, and could also address some of the issues i faced, atleast atleast provide a safety net for students going through similar chalenges. A lot of things are in the works and a lot of updates and drastic changes will be made dynamically to this platform, i want it to be a students bible.` ;
const lines = splitIntoLines(text + text + text, 42)

 const offsetX = useSharedValue<number>(0);
const offsetY = useSharedValue<number>(0);
const radius = useSharedValue(0)
const opacity = useSharedValue(0)
// Buble Motion
const posX = useSharedValue<number>(width / 2);
const posY = useSharedValue<number>(height / 2);
const bubbleSize = radius.value;

 const tapGesture = Gesture.Pan()
    .minDistance(0) // Allow movement without minimum distance
    .onBegin((event) => {
        'worklet'
      // When dragging starts, bubble appears under finger
      posX.value = withTiming(event.absoluteX, { duration: 100 });
      posY.value = withTiming(event.absoluteY - bubbleSize*2,{ duration: 100 });

      // sequence this, expands slightly before appearing, like wise disapear motion
      radius.value = withTiming(100, {duration:200})
   
      // Calculate offset for smooth dragging

    })
    .onUpdate((event) => {
      "worklet"
      // Update position as finger moves (with offset for center positioning)
      posX.value = withSpring(event.absoluteX, { stiffness: 180,
  damping: 35} );
      posY.value = withSpring(event.absoluteY - bubbleSize*2, {
         stiffness: 180,
  damping: 35
      }) ;
    })
    .onEnd(() => {
        'worklet'
      // Optional: Smooth stop animation
      posX.value = withTiming(posX.value , { duration: 100 });
      posY.value = withTiming(posY.value, { duration: 100 });
      radius.value = withTiming(0, {duration:200})
    });

    const animatedCircleProps = useAnimatedProps(() => ({
    cx: posX.value,
    cy: posY.value,
    r: radius.value,
  }));

  return (
   <GestureHandlerRootView style={{
    flex:1,
    pointerEvents: 'box-only'
   }}>
    <SafeAreaView className='bg-transparent  flex h-screen items-center justify-around '>
      {/* title should be above both texts instead of outting another title in svg */}
    <Text
    className='font-bold text-3xl underline z-4'
    >Manifesto</Text>


<GestureDetector gesture={tapGesture}>

<View className='border h-[70%]'>
<ScrollView className='w-100% h-100%'>
<Text className='p-10 px-8 text-center relative top-[9]'
    style={{
    fontSize:15,
    lineHeight: 16 * 1.8,
    filter:'blur(3)'}}
>
    {text}
    {text}
</Text>
</ScrollView > 
<View className='w-[100%]  h-[100%] top-0 absolute  flex items-center justify-center'>

  {/* Bubble */}
  <AnimatedSvg height="100%" width="100%" 
  style={{
      backfaceVisibility: 'hidden',
    opacity: 1
  }} >
  <Defs>
    {/* Simple mask: circle = visible, outside = hidden */}
    <LinearGradient  x1="0" y1="0" x2="0" y2="1"
        id="Gradient">
      <Stop offset="0" stopColor="#57a886" />
      <Stop offset="1" stopColor={color.morange} />
    </LinearGradient>
    <Mask id="text-mask"
    maskUnits="userSpaceOnUse"> 
      <AnimatedCircle  animatedProps={animatedCircleProps} fill="white" />
    </Mask>
  </Defs>


  <Rect x="0" y="0" width="100%" height="100%"  fill="url(#Gradient)"  mask="url(#text-mask)"/>
  {/* Text only visible inside circle */}
  {/* mask="url(#text-mask)" */}
    
  <SvgText
    x="50%"
    y={60}
    textAnchor="middle"
    fontSize="15"
    fill="black"
    mask="url(#text-mask)"
    >
      {lines.map((line, index) => (
      <TSpan
        key={index}
        x="50%"
        dy={index === 0 ? "0" : "1.8em"} // Line spacing
        textAnchor="middle"
      >
        {line}
       
      </TSpan>
    ))}
  </SvgText> 
</AnimatedSvg>
</View>

</View>
</GestureDetector>
      <TouchableOpacity onPress={()=> openDashboard()}>
        <Text className='relative bottom-12 '>Back</Text>
      </TouchableOpacity>

    </SafeAreaView>
</GestureHandlerRootView>   
  )
}

export default Manifesto