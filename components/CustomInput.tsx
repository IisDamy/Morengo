import { CustomInputProps } from "@/types";
import React,{useState} from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { color } from "@/constants";



const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  maxLength,
  label,
  secureTextEntry = false,
  keyboardType = "default",
}: CustomInputProps) => {


  const [isFocused, setIsFocused] = React.useState(false);
  const [isVisible, setIsVisible] = useState(false)
  return (
    <View className="rounded-[10] items-center p-2 flex-row bg-zinc-100  border-zinc-200 border "

    >
      <TextInput
        className=" w-full  h-full "
        autoCapitalize="none"
        autoCorrect={false}
    maxLength={maxLength || undefined}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={"#888"}
        secureTextEntry={
         label==='Password'?!isVisible:false
        }
      />
     {label==='Password' && 
     <TouchableOpacity 
      onPress={()=> setIsVisible(prev => !prev)}
     >
        <Ionicons name={isVisible?'eye-off-outline':'eye-outline'} size={20}
        color={'black'}
        className="relative  p-2 right-10 "
        /> 
      </TouchableOpacity>}
    
    </View>
  );
};

export default CustomInput;
