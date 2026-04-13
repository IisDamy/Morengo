import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { color, TabGrouping } from '@/constants'

const vendors = [
    {
        vendorName:"Item-7",
        ratings:"4.5",
        contact:"",
    },
     {
        vendorName:"Item-7",
        ratings:"4.5",
        contact:"",
    },
     {
        vendorName:"Item-7",
        ratings:"4.5",
        contact:"",
    },
     {
        vendorName:"Item-7",
        ratings:"4.5",
        contact:"",
    },

  
]

const MenuVendorPanel = () => {

    const [activeGroup, setActiveGroup] = useState('Recent')

  return (
    <View className='w-[100%] border-b border-zinc-200 rounded-[30]  mt-4'>
    
        <View className='flex flex-row  justify-between '
          
        >
            {TabGrouping.map((group, index) =>

            <Pressable onPress={()=>setActiveGroup(group)
            }>
                <Text id={`${index}`} className={` py-3 tracking-wider  font-bold`}
                    style={{
                        color: activeGroup === group?color.morange:'#ae723654',
                        fontSize:14.5
                    }}
                >{group}</Text>
            </Pressable >)}
        </View>

        <View className='flex mt-6 gap-6'>
            {vendors.map((item, index)=> (
                <View id={`${index}`} className='bg-[#F8F8F8] overflow-hidden p-2 rounded rounded-2xl h-[120] '
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
                    <View className='bg-yellow-200 flex  pl-4 justify-center h-full w-[35%] rounded rounded-2xl'>
                        <Text className='uppercase '>
                            {item.vendorName}
                        </Text>
                    </View>
                    <View className='h-full w-[65%]'>
                            <Text></Text>
                    </View>
                </View>))}
        </View>

        <TouchableOpacity className=' mt-16 px-2 mb-24 self-center'>
        <Text className='  
         tracking-wider  color-green-300 text-sm text-center 
        font-bold '
        
        >
            See more
        </Text>
        </TouchableOpacity>
        
   </View>
  )
}

export default MenuVendorPanel