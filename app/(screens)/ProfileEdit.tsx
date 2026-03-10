import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Back from '@/components/Back'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAuthStore from '@/store/auth.store'
import { CustomDropdown, CustomInput } from '@/components'
import { router } from 'expo-router'
import { updateUser } from '@/lib/appwrite'


const ProfileEdit = () => {

  const {user} = useAuthStore()
  const [focus, toggleFocus] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
      const [form, setForm] = useState({
      name:user?.name,
      email:user?.email,
      number:user?.number,
      institution:user?.institution
    })

 const handleSave = async () => {
  try{
    await updateUser({
      name:form.name, 
      email:form.email, 
      number:form.number, 
      institution:form.institution, 
      accountId:user?.accountId})


  }
  catch(e){

  }
 }
  return (
    <SafeAreaView className='w-full flex items-center px-6 pt-2'>
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
  
           <View className='flex-row items-center justify-between'>
            <TextInput
              value={form.name}
              className='w'

            />
            <MaterialIcons name='mode-edit-outline' size={20} color={'#C2C2CB'}/>
        </View>
    
       
       <TouchableOpacity onPress={() => router.push('/(screens)/ResetPassword')}>
          <View className='flex-row items-center justify-between'>
            <Text>*******</Text>
            <MaterialIcons name='mode-edit-outline' size={20} color={'#C2C2CB'}/>
        </View > 
       </TouchableOpacity>
     
     
          <View className='flex-row items-center justify-between'>
            <TextInput
            value={form.email}
            />
            <MaterialIcons name='mode-edit-outline' size={20} color={'#C2C2CB'}/>
        </View >


          <View className='flex-row items-center justify-between'>
            <TextInput
              value={form.number}
            />
            <MaterialIcons name='mode-edit-outline' size={20} color={'#C2C2CB'}/>
        </View>
  
     
        <View className='flex-row items-center  justify-between'>
          <View className='w-[78%]'>
            <CustomDropdown 
            value={form.institution}
            
            />
          </View>
            
            <MaterialIcons name='mode-edit-outline' size={20} color={'#C2C2CB'} className=''/>
        </View>
       
  

      </View>
        </View>
    </SafeAreaView>

  )
}

export default ProfileEdit