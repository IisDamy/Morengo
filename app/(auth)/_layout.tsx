import { Redirect, Slot } from 'expo-router'
import React, { useEffect } from 'react'
import { Dimensions, KeyboardAvoidingView, Platform, Text, View, ImageBackground, Image, Button, ScrollView } from 'react-native'
import { router } from 'expo-router'
import {images} from '../../constants/index'
import Sentry from '@sentry/react-native'
import useAuthStore from '@/store/auth.store'
import { SafeAreaView } from 'react-native-safe-area-context'


const AuthLayout = () => {
  // const {isAuthenticated} = useAuthStore()
  const { isAuthenticated, user } = useAuthStore();


  if(isAuthenticated) return <Redirect href='/(tabs)' />
  
  return (
 
    <KeyboardAvoidingView behavior={ 'padding' } style={{flex:1}} className='bg-white'>
        <ScrollView keyboardShouldPersistTaps='handled' className=''>
        <View style={{height: Dimensions.get('screen').height/2.25}} className='bg-white'>
          
            <Image source={images.loginGraphic} />
        </View>
        <Slot />
    </ScrollView> 
    </KeyboardAvoidingView>
   
   
  )
}

export default AuthLayout