
import { Alert, Image, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';


const ImagePickerD = ({image, setImage}:{image:string | null, setImage:(image:string) => void}) => {

    const pickImage = async () => {
  Alert.alert("Select Image", "Choose an option", [
    {
      text: "Camera",
      onPress: async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) return;

        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ['images'],
          quality: 0.7,
        });

        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      },
    },
    {
      text: "Gallery",
      onPress: async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) return;

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          quality: 0.7,
        });

        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      },
    },
    { text: "Cancel", style: "cancel" },
  ]);
};




// const imageUrl = user?.avatar
//   ? storage.getFilePreview('YOUR_BUCKET_ID', user.avatar)
//   : null;

  return (
  <TouchableOpacity onPress={pickImage}>
  {image ? (
    <Image
      source={{ uri: image }}
      className='w-[100] h-[100] rounded-full mb-12 my-2'
    />
  ) : (
    <View className='w-[100] h-[100] rounded-full mb-12 my-2 bg-zinc-300 items-center justify-center'>
      <MaterialIcons name="camera-alt" size={28} color="gray" />
    </View>
  )}
</TouchableOpacity>
  )
}

export default ImagePickerD