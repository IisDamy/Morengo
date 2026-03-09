import { View, Text } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { color } from '@/constants'

const location = () => {
  return (
    <SafeAreaView>
     <View className='w-full flex items-center  px-6'>
         <View className='flex-row  w-full'>
              <MaterialIcons
                    name="keyboard-arrow-left"
                    size={20}
                  
                    className="absolute "
                  />
                  <Text className='w-full text-center order-2'>My Address</Text>
      </View>
      <Text className='p-4'>Search</Text>
      <Text>Address text</Text>
      <View className='mt-4 h-[73%] w-screen bg-zinc-300'>

      </View>
      <Text className='rounded-full mt-6 text-white p-4 font-bold text-center w-64' style={{
        backgroundColor:color.morange
      }}>Save</Text>
     </View>
    </SafeAreaView>
  )
}

export default location