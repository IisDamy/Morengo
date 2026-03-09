import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const LocationChangeButton = () => {
    const [currentLocation, setCurrentLocation] = useState('Home')
    const [open, toggleOpen] = useState(false)

    const temporary = [
        {
            name:'Home'
        },
            {
            name:'Work'
        }
    ]

    const changeLocation = (loc:string) => {
        setCurrentLocation(loc)
        toggleOpen(false)
    }

  return (
        <>
            <Pressable onPress={()=>toggleOpen(prev => !prev)} >
                 <View className="flex flex-row  items-center">
                  <Ionicons
                    name="location-outline"
                    size={16}
                    color="white"
                    className="relative"
                  />

                  <Text className=" text-center ml-[3] text-[13px] text-green-100">
                    {/* when inputing location name, must not be more than like 6 characters */}
                    {currentLocation}
                  </Text>
                  <MaterialIcons
                    name={open?"keyboard-arrow-up": "keyboard-arrow-down"}
                    size={14}
                    color={"#d4e3d5"}
                    className="relative top-[2] "
                  />
                </View>
            </Pressable>

           {/* supposed to roll down, use ai */}
           {
           open &&
           
            <View className='absolute  rounded-b-[5]  left-[6] py-1 bg-white  top-[22]'>
                
                    {temporary.map((item)=>
                    <Pressable onPress={()=> changeLocation(item.name)}>
                    <Text className='border-b px-4 py-1 border-zinc-300'>{item.name}</Text>
                    </Pressable>
                    )}
                
                    
            </View>
                    }
        </>
  )
}

export default LocationChangeButton