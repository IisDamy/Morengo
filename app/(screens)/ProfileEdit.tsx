import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
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
   const result = await updateUser({
      accountId:user?.$id,
      name:form.name, 
      email:form.email, 
      number:form.number, 
      institution:form.institution})
    if(!result){
      throw new Error('Update failed')
    }
    else{Alert.alert('Profile Updated')}

  }
  catch(e){
    console.error(e)
  }
 }
  return (
    <SafeAreaView className='w-full flex items-center px-6 pt-2'>
      <View className='w-full items-center'>
      <View className='flex-row w-full justify-between'>
        <Back />
        
        <TouchableOpacity onPress={handleSave}>
            <Text className='font-bold text-xl p-1 text-pink-400'>Save</Text>
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
              className='w-full'
                onChangeText={(text) => {
            setForm({ ...form, name: text });
          }}

            />
            <MaterialIcons name='mode-edit-outline' className='relative right-5' size={20} color={'#C2C2CB'}/>
        </View>
    
       
       <TouchableOpacity onPress={() => router.push('/(screens)/ResetPassword')}>
          <View className='flex-row items-center justify-between'>
            <Text>*******</Text>
            <MaterialIcons name='mode-edit-outline' size={20} color={'#C2C2CB'}/>
        </View > 
       </TouchableOpacity>
     
     
          <View className='flex-row items-center justify-between'>
            <TextInput
            className='w-full'
            value={form.email}
               onChangeText={(text) => {
            setForm({ ...form, email: text });
          }}
            />
            <MaterialIcons name='mode-edit-outline' className='relative right-5' size={20} color={'#C2C2CB'}/>
        </View >


          <View className='flex-row items-center justify-between'>
            <TextInput
              className='w-full'
              value={form.number}
                 onChangeText={(text) => {
            setForm({ ...form, number: text });
          }}
            />
            <MaterialIcons name='mode-edit-outline' className='relative right-5' size={20} color={'#C2C2CB'}/>
        </View>
  
     
    { user?.isStudent &&   <View className='flex-row items-center  justify-between'>
          <View className='w-[78%]'>
            <CustomDropdown 
            value={form.institution}
            onValueChange={(value) => setForm({...form, institution:value})}
            />
          </View>
            
            <MaterialIcons name='mode-edit-outline'  size={20} color={'#C2C2CB'} />
        </View>
       }
  

      </View>
        </View>
    </SafeAreaView>

  )
}

export default ProfileEdit