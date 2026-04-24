import { View, Text, Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import {images} from '@/constants'
// place in _layout before safe areaview
// only loads when app opens
const SplashScreen2 = () => {
  return (
    <View className='h-screen w-screen bg-black flex
    items-center justify-center
    '>
        <StatusBar
          style='light'
          backgroundColor={'#0000'}
          translucent
          hidden
      />
      {/* morengo text or logo */}
        <Image source={images.morengologo}/>
    </View>
  )
}

export default SplashScreen2