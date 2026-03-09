import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { color } from '@/constants'

const PointsIcon = () => {
  return (
    <TouchableOpacity>
        <View className='border overflow-hidden rounded-full flex items-center justify-center w-6 h-6 border-[gold]'>
            {/* ornage fills up asyou acquire points, use ai to calcutate distance */}
        <View className='w-6 h-6 absolute top-[10]'
            style={{
                backgroundColor:color.morange
            }}
        ></View>
      <Ionicons color={'gold'} name="sparkles" size={12}/>
    </View>
    </TouchableOpacity>
    
  )
}

export default PointsIcon