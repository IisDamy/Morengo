import { View, Text, Pressable } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { router } from 'expo-router'

const Back = () => {
  return (   
  <>
            <Pressable onPress={()=> router.back()}>
             <View className='p-2 rounded-full border'>
               <MaterialIcons
                    name="keyboard-arrow-left"
                    size={20}
                    
                    className="relative  "
                  />
            </View>
            </Pressable>
    </>
  )
}

export default Back