import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from "react-native-reanimated";
import useAuthStore from '@/store/auth.store';


    const temporary = [
        {
            name:'Home'
        },
            {
            name:'Work'
        }
    ]


const LocationChangeButton = () => {
    const {user} = useAuthStore()

    const [currentLocation, setCurrentLocation] = useState('Home')
    const [open, toggleOpen] = useState(false)
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);

        const changeLocation = (loc:string) => {
        setCurrentLocation(loc)
     
        handleToggle();
    }

    useEffect(()=>{
      console.log(user?.addresses)
    },[open])

    const handleToggle = () => {
  const newState = !open;
  toggleOpen(newState);

  scale.value = withTiming(newState ? 1 : 0, { duration: 220 });
  opacity.value = withTiming(newState ? 1 : 0, { duration: 180 });
};


    const animatedDropdownStyle = useAnimatedStyle(() => {
  return {
    transform: [{ scaleY: scale.value }],
    opacity: opacity.value
  };
});



  return (
        <>
            <Pressable onPress={handleToggle} >
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
         
           
            <Animated.View 
            style={[animatedDropdownStyle, { transformOrigin: "top" }]}
            className='absolute border border-t-[0] rounded-b-[5]  px-2 left-[6] pb-1 bg-green-100  top-[22]'>
                
                    {temporary.map((item)=>
                    <Pressable onPress={()=> changeLocation(item.name)}>
                    <Text className='border-b px-2  py-1 border-zinc-300 text-sm'>{item.name}</Text>
                    </Pressable>
                    )}
                
                    
            </Animated.View>
                    }
        </>
  )
}

export default LocationChangeButton