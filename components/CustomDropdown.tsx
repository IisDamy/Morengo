import { View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native'
import React,{useState} from 'react'
import DropDownPicker, { RenderListItemPropsInterface } from 'react-native-dropdown-picker';
import { universities } from '@/constants';
import { CustomDropdownProps } from '@/types';



const CustomDropdown = ({value, onValueChange}: CustomDropdownProps) => {
  const items = universities.map((item) => ({
    label: item,
    value: item, // value can just be the string itself
  }));
const [open, setOpen] = useState(false);

const renderListItem = ({isSelected, onPress,item}: RenderListItemPropsInterface<T>
) => {

  return (
    <TouchableOpacity
    onPress={() =>onPress(item)}
    
    >

      <Text style={{ padding: 16, color: isSelected ? '#57a886' : '#000' }}
        className='leading-6 border-b border-gray-200'
      >
        {item.value}
      </Text>
    </TouchableOpacity>
  )
}

  return (
    <View className='w-full '>
      <DropDownPicker
        
  //        listMode="MODAL"
  // modalProps={{
  //   animationType: "slide",
  // }}
    listMode="SCROLLVIEW"
    maxHeight={400}

        open={open}
        items={items}
        value={value}
        setOpen={setOpen}
        setValue={(callback) => {
        // The callback pattern from react-native-dropdown-picker
        const newValue = callback(value);
        onValueChange(newValue);
        return newValue;}}

        searchable={true}
        placeholder="Select your institution"
        searchPlaceholder='Search for your institution'
      style={{
          borderRadius: 10,           // rounded-[10]
          backgroundColor: "#f4f4f5", // bg-zinc-100
          paddingHorizontal: 8,       // p-2
          borderColor: "#e4e4e7",     // border-zinc-200
          borderWidth: 1,             // border
          height: 48,                 // h-12
          width: "100%",              // w-full
        }}

        // Dropdown list container (opened state)
        dropDownContainerStyle={{
          borderRadius: 10,
          borderColor: "#e4e4e7",
          borderWidth: 1,
        }}
        

        searchContainerStyle={{
          borderBottomColor:'transparent',
      borderColor:'transparent',
          
          height:80,
         
        }}

        searchTextInputStyle={{
  fontSize: 14,
  height: 40,
  margin:0,
  padding:0,
  

}}

renderListItem={renderListItem}

ListEmptyComponent={() => (
    <Text style={{ padding: 16, paddingTop:0, textAlign: "center" }}>
      No matching results found
    </Text>
  )}
      />

      
    </View>
  )
}

export default CustomDropdown