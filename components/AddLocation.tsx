import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { color } from '@/constants'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import { createAddress, getUserAddresses, updateUserAddress } from '@/lib/appwrite'
import useAuthStore from '@/store/auth.store'
import { Address } from '@/types'



interface AddLocationProps {
  isOpened: boolean
  coords: number[] | []
  type: 'Customer' | 'Vendor'
}


const AddLocation = ({ isOpened, coords }: AddLocationProps) => {

  const { user } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [existingAddresses, setExistingAddresses] = useState<Address[] | null>(null)
  const [newAddress, setNewAddress] = useState({ name: 'Home', coords: coords, isDefault: false })

  const inputRef = useRef(null)
  const scale = useSharedValue(0.5)
  const opacity = useSharedValue(0)


  // Fetch the existing address row for this user on mount
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const addresses = await getUserAddresses(user?.accountId || '');
        setExistingAddresses(addresses)
      } catch (e: any) {
        console.error('Failed to fetch address:', e.message)
      }
    }
    fetchAddress()
  }, [])


const saveUserLocation = async () => {
  try {
    if (!existingAddresses) {
      await createAddress({
        name: newAddress.name,
        coords,
        isDefault: newAddress.isDefault,
      });
      Alert.alert('Address successfully saved');
      return;
    }

    const match = existingAddresses.find(
      address =>
        (address.coords[0] === coords[0] &&
         address.coords[1] === coords[1]) ||
        address.name === newAddress.name
    );

    if (match) {
      await updateUserAddress({
        address: {
          ...match,
          ...newAddress,
          coords,
        },
      });
    } else {
      await createAddress({
        name: newAddress.name,
        coords,
        isDefault: newAddress.isDefault,
      });
    }

    Alert.alert('Address successfully saved');
  } catch (e: any) {
    console.error('saveUserLocation error:', e.message);
    Alert.alert('Error', e.message || 'Failed to save address');
  }
};




  const handleAddLocation = async () => {
    setIsLoading(true)
    try {
        await saveUserLocation()
     
    } catch (e: any) {
      console.error('handleAddLocation error:', e.message)
    } finally {
      setIsLoading(false)
    }
  }


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
        { translateX: 50 },
        { translateY: -50 },
        { scale: scale.value },
        { translateX: -50 },
        { translateY: 50 },
      ],
    }
  })

  return (
    <Animated.View
      style={animatedStyle}
      className="bg-white right-[45] top-[-25] rounded-[10] w-28 gap-3 p-2 h-fit absolute"
    >
      <TextInput
        ref={inputRef}
        className="bg-zinc-200 border-zinc-400 p-2 text-sm rounded-[5] py-2 border"
        value={newAddress.name}
        maxLength={20}
        onChangeText={(text) => setNewAddress(prev => ({ ...prev, name: text }))}
      />

      <TouchableOpacity onPress={handleAddLocation} disabled={isLoading}>
        <Text
          className="p-2 rounded-[10] text-center font-bold text-white"
          style={{ backgroundColor: isLoading ? '#aaa' : color.moregreen }}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default AddLocation
