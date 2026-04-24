import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from "react-native-reanimated";
import useAuthStore from '@/store/auth.store';
import { account, getUserAddresses, updateUserAddress } from '@/lib/appwrite';

const LocationChangeButton = () => {
  const { user } = useAuthStore()

  const [userAddresses, setUserAddresses] = useState<any[]>([])
  const [currentAddress, setcurrentAddress] = useState('Select')
  const [open, toggleOpen] = useState(false)

  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    const fetchUserAddresses = async () => {

      if (user?.accountId) {
        const addresses = await getUserAddresses(user.accountId);
      
        setUserAddresses(addresses);
        
  
        const defaultAddress = addresses.find((item: any) => item.isDefault);
        if (defaultAddress) {
          setcurrentAddress(defaultAddress.name);
        }
      }
    };
    fetchUserAddresses();
  }, []);

  

  const changeLocation = async (selectedName:string) => {
try{
 console.log(selectedName)
    const updatedAddresses = userAddresses.map((item) => ({
      ...item,
      isDefault: item.name === selectedName?true:false
    }));
      const defaultAddress = updatedAddresses.find((item) => item.isDefault);
    await updateUserAddress({
    selectedName: selectedName,
  selectedId: user?.accountId,
  addresses: [...updatedAddresses]})
    setUserAddresses(updatedAddresses);

    setcurrentAddress(selectedName);
    
    handleToggle();
}
catch(e:any){
  console.error('Failed to update address:', e.message)
}
   
  };

  const handleToggle = () => {
    const newState = !open;
    toggleOpen(newState);
console.log(userAddresses, 'wwwwww')
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
      <Pressable onPress={handleToggle}>
        <View className="flex flex-row items-center">
          <Ionicons
            name="location-outline"
            size={16}
            color="white"
          />

          <Text className="text-center font-bold ml-[3] text-[13px] text-green-100">
            {currentAddress}
          </Text>

          <MaterialIcons
            name={open ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={15}
            color={"#DCFCE7"}
            className="relative top-[2]"
          />
        </View>
      </Pressable>

      {userAddresses.length > 0? <Animated.View
        style={[animatedDropdownStyle, { transformOrigin: "top" }]}
        className='absolute border border-t-[0] rounded-b-[5] px-2 left-[6] bg-green-100 top-[22]'
      >
        {userAddresses.map((item) => (
          <Pressable
            key={item.$id || item.name}
            onPress={() => changeLocation(item.name)}
          >
            <Text className='border-b px-2 py-1 border-white text-sm'>
              {item.name}
            </Text>
          </Pressable>
        ))
     
      }
      </Animated.View>:
      
        <Animated.Text style={[animatedDropdownStyle, { transformOrigin: "top" }]}
        className='absolute left-[-12]  top-[22]'>
          {'<'}No saved addresses{'>'}
          </Animated.Text>}
    </>
  )
}

export default LocationChangeButton;