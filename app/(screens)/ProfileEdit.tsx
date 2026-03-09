import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Back from '@/components/Back'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAuthStore from '@/store/auth.store'
import { CustomInput } from '@/components'

const ProfileEdit = () => {

  const {user} = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  return (
    <SafeAreaView className='w-full flex items-center px-6 pt-2'>
        {isEditing?
        <View className='mx-6 mt-20'>
            <CustomInput focus={true}/>
        </View>
        
:
      <View className='w-full items-center'>
      <View className='flex-row w-full justify-between'>
        <Back />
        
        <TouchableOpacity >
            <Text className='font-bold text-green-300'>Save</Text>
        </TouchableOpacity>
      </View>
  
      <View className='w-[100] border rounded-full h-[100] mb-12 my-2 bg-zinc-300'></View>
    {/* this is mapped through, user info then updates based on id */}
      <View className='bg-white p-4  gap-10 rounded-[10] w-[98%]'
        style={{
          shadowColor: "#1a1a1a",
          shadowOffset: {
          width: 0,
          height: 0,
          },
          elevation: 2,
          shadowOpacity: 0.25,

        }}
      >
       <TouchableOpacity onPress={()=>setIsEditing(true)}>
           <View className='flex-row items-center justify-between'>
            <Text>{user?.name}</Text>
            <MaterialIcons name='mode-edit-outline' size={20} color={'#C2C2CB'}/>
        </View>
       </TouchableOpacity>
       
       <TouchableOpacity onPress={()=>setIsEditing(true)}>
          <View className='flex-row items-center justify-between'>
            <Text>Password</Text>
            <MaterialIcons name='mode-edit-outline' size={20} color={'#C2C2CB'}/>
        </View > 
       </TouchableOpacity>
     
      <TouchableOpacity onPress={()=>setIsEditing(true)}>
          <View className='flex-row items-center justify-between'>
            <Text>{user?.email}</Text>
            <MaterialIcons name='mode-edit-outline' size={20} color={'#C2C2CB'}/>
        </View >
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>setIsEditing(true)}>
          <View className='flex-row items-center justify-between'>
            <Text>{user?.number}</Text>
            <MaterialIcons name='mode-edit-outline' size={20} color={'#C2C2CB'}/>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>setIsEditing(true)}>
        <View className='flex-row items-center  justify-between'>
            <Text className='w-[60%]'>{user?.institution}</Text>
            <MaterialIcons name='mode-edit-outline' size={20} color={'#C2C2CB'} className=''/>
        </View>
       
      </TouchableOpacity>

      </View>
        </View>}
    </SafeAreaView>

  )
}

export default ProfileEdit