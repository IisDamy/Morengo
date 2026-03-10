import { View, Text,FlatList, Pressable, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { color } from '@/constants'
import { NotificationBell, TabsHeader, ToggleButton } from '@/components'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { ScrollView } from 'react-native'
import { useTabBarVisibility } from '@/contexts/TabBarVisibilityContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { signOut, updateUser } from '@/lib/appwrite'

const Profile = () => {
  const { onScroll } = useTabBarVisibility();
    const [enablePromoNotifs, setEnablePromoNotifs] = useState(true);
    const [enableNotifs, setEnableNotifs] = useState(true);


    const toggleSwitchNotifs = () => setEnableNotifs(previousState => !previousState);
    const toggleSwitchPromo = () => setEnablePromoNotifs(prev => !prev)
  const LogOff = async () => {
  try{
    await signOut()
    router.replace('/(auth)/sign-in')
  }
  catch(e){
    
  }
  }


  return (
    <SafeAreaView>
        <ScrollView
    onScroll={onScroll}
          scrollEventThrottle={16}
  >
      <View className='profile items-center px-6  h-fit'

    >
    <TabsHeader tabName='Profile'/>

       <View className='w-32 h-24 mt-6 mb-6 border rounded-full bg-zinc-300'>
        {}
        </View>
      <View className=' w-full px-10 flex-row justify-between mb-6 flex items-center'>
        <View className='flex items-center'>
          <View className='rounded-full w-10 h-10 border'></View>
          <Text>History</Text>
        </View>
         <View className='flex items-center'>
          <View className='rounded-full w-10 h-10 border'></View>
          <Text>Address</Text>
        </View>
        <View className='flex items-center'>
          <View className='rounded-full w-10 h-10 border'></View>
          <Text>My Points</Text>
        </View>
        

      </View>
      
      {/*maybe use flatlist for this, i thoink flatlist allows you to add headers */}
      <View className='bg-white rounded-[10] h-fit p-6 w-full gap-12'>
        <View className=''>
          <Text className='font-bold text-xl mb-2 tracking-wider'
            style={{color:color.moregreen}}
          >My account</Text>
       <TouchableOpacity onPress={()=>router.push('/(screens)/ProfileEdit')}>
           <View className='flex-row justify-between border-b py-5 border-zinc-300'>
        <Text className=''>Manage Profile</Text>
        <MaterialIcons name='keyboard-arrow-right' size={20} color={'#C2C2CB'}/>
       </View>
       </TouchableOpacity>

       <TouchableOpacity>
          <View className='flex-row justify-between border-b py-5 border-zinc-300'>
          <Text>Payment</Text>
          <MaterialIcons name='keyboard-arrow-right' size={20} color={'#C2C2CB'}/>
       </View>
       </TouchableOpacity>
    

        </View>


        <View className=''>
             <Text className='text-xl font-bold mb-2 tracking-wider'
              style={{color:color.moregreen}}
             >Notifications
             </Text>

        <Pressable onPress={toggleSwitchNotifs}>
          <View className='border-b py-5 justify-between items-center flex-row border-zinc-300'>
          <Text>Notification</Text>
          <ToggleButton isEnabled={enableNotifs} toggleSwitch={toggleSwitchNotifs}/>
       </View>
        </Pressable>   
       
       <Pressable onPress={toggleSwitchPromo}>
        <View className='border-b py-5 justify-between items-center flex-row border-zinc-300'>
        <Text>Promotional Notification</Text>
        <ToggleButton isEnabled={enablePromoNotifs} toggleSwitch={toggleSwitchPromo}/>
        </View>
       </Pressable>

        </View>


        <View className=''>
             <Text className='text-xl font-bold mb-2 tracking-wider'
              style={{color:color.moregreen}}
             >More
             </Text>
        <TouchableOpacity>
          <View className='border-b flex-row justify-between py-5 border-zinc-300'>
            <Text>Contact us</Text>
            <MaterialIcons name='keyboard-arrow-right' size={20} color={'#C2C2CB'}/>
          </View>
        </TouchableOpacity>
       
       <TouchableOpacity>
        <View className='border-b flex-row justify-between py-5 border-zinc-300'>
          <Text>Share morengo</Text>
          <MaterialIcons name='keyboard-arrow-right' size={20} color={'#C2C2CB'}/>
      </View>
       </TouchableOpacity>
   
        </View>
      {/* logout */}
       <View>
        <TouchableOpacity onPress={LogOff}>
          <Text className='font-bold'>Log Out</Text>
        </TouchableOpacity>
      
       </View>
      
      </View>
    </View>
  </ScrollView>
    </SafeAreaView>
  
  )
}

export default Profile