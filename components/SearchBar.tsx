import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useState } from "react";
import { Image, TextInput, View } from "react-native";
import { images } from "../constants/index";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
 
  return (
    <View className=" w-full px-2">
       <TextInput
      className="h-15 w-full rounded-lg px-4 mt-3 mb-3 bg-[#f8f8f8ff]"
      value={searchInput}
      onChangeText={setSearchInput}
      placeholder={'sEARCH'}
      keyboardAppearance="default"
      />

      <FontAwesome6 name="sliders" size={24} color="#FBA83C" className="absolute right-5 top-[18px]"/>
    </View>
  )
}

export default SearchBar