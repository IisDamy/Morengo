import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { CustomButtonProps } from '@/types'
import { color } from '@/constants'



const CustomButton = (
    {
        onPress,
        title='Click Me',
        style,
        textStyle,
        leftIcon,
        isLoading=false
    }: CustomButtonProps
) => {
  return (
  <TouchableOpacity onPress={onPress} >
    {leftIcon}
    <View className={`flex items-center rounded-[10] py-5  p-2 ${style}`}
       
    >
        {isLoading? (
            <ActivityIndicator size={'small'} color={'white'}/>):(
                <Text className='text-white font-bold tracking-wide' style={textStyle}>
                    {title}
                </Text>
        )}
    </View>
    
  </TouchableOpacity>
  )
}

export default CustomButton