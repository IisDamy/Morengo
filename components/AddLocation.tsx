import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { color } from '@/constants'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import { updateUser, updateUserAddress } from '@/lib/appwrite'
import useAuthStore from '@/store/auth.store'
import { Address } from '@/types'
interface AddLocationProps {
  isOpened: boolean,
  coords:number[] | []

}



const AddLocation = ({ isOpened, coords }: AddLocationProps) => {

  const {user} = useAuthStore()

  const [isLoading, setIsLoading] = useState(false)
  const [addresses, setAddresses] = useState<Address[] | []>([])
  const [newAddress, setNewAddress] = useState({
    name:'Home',
    coords:coords,
    type:'Customer',
    isDefault:true,
    country:'ng',

  })

  const inputRef = useRef(null)

  const scale = useSharedValue(0.5)
  const opacity = useSharedValue(0)



const handleAddLocation = async () => {
  setIsLoading(true);

  try {
    const safeAddresses = Array.isArray(addresses) ? [...addresses] : [];

    const index = safeAddresses.findIndex(
      addr => addr.coords?.[0] === coords?.[0] && addr.coords?.[1] === coords?.[1]
    );

    let updatedAddresses;

    if (index !== -1) {
      // update existing
      updatedAddresses = safeAddresses.map((addr, i) =>
        i === index ? { ...addr, ...newAddress} : addr
      );
    } else {
      // add new
      updatedAddresses = [
        ...safeAddresses,
        { ...newAddress, coords },
      ];
    }

    setAddresses(updatedAddresses);

    const result = await updateUserAddress({
      accountId: user?.$id,
      addresses: updatedAddresses,
    });

    if (!result) throw new Error("Failed to update user");

    Alert.alert("Address successfully updated");
  } catch (e: any) {
    console.error(e)
  } finally {
    setIsLoading(false);
  }
};

  

useEffect(() => {
  if (user?.addresses && Array.isArray(user.addresses)) {
    setAddresses(user.addresses);
  } else {
    setAddresses([]);
  }
}, [user]);




  useEffect(() => {
    if (isOpened) {
      inputRef.current?.focus()
      opacity.value = withTiming(1, { duration: 250 })
      scale.value = withTiming(1, { duration: 250 })
    } else {
      inputRef.current?.blur()
      opacity.value = withTiming(0, { duration: 200 })
      scale.value = withTiming(0.1, { duration: 200 })
    }
  }, [isOpened])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateX: 50 },   // shift left to anchor scale to top-right
        { translateY: -50 },  // shift up slightly
        { scale: scale.value },
        { translateX: -50 },
        { translateY: 50 },
      ],
    }
  })

  return (
    <Animated.View
      style={animatedStyle}
      className="bg-white right-[45] top-[0] rounded-[10] w-28 gap-3 p-2 h-fit absolute"
    >
      <TextInput
        ref={inputRef}
        className="bg-zinc-200 border-zinc-400  p-2 text-sm rounded-[5] py-2 border "
        value={newAddress.name}
        maxLength={10}
        onChangeText={(text) => setNewAddress(prev =>( {...prev, name:text}))}
        
      />

      <TouchableOpacity onPress={handleAddLocation}>
        <Text
          className=" p-2 rounded-[10] text-center font-bold text-white"
          style={{ backgroundColor: color.moregreen }}
        >
          Save
        </Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default AddLocation