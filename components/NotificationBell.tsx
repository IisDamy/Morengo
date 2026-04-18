import Feather from "@expo/vector-icons/Feather";
import { color } from "@/constants";


import { View, Text } from 'react-native'
import React from 'react'

interface NotificationBellProps {
  color1:string,
  color2:string
}

const NotificationBell = ({color1, color2}:NotificationBellProps) => {
  return (
    <View className="">
        <Feather name="bell" size={22} color= {color1?color1: "white" }/>
        <Text className="absolute w-4 h-4 left-[12] text-[8px] pt-[1] text-yellow-100 overflow-hidden text-center rounded-full"
                style={{ backgroundColor:color2?color2: color.morange }}>
                      12
        </Text>
    </View>
  )
}

export default NotificationBell