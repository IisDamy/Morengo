import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { color, TabGrouping } from '@/constants'
import { Vendor } from '@/types'


const MenuVendorPanel = ({data}: {data: any}) => {

    const [activeGroup, setActiveGroup] = useState('Recent')

  return (
    <View className='w-[100%] border-b border-zinc-200 rounded-[30]  '>
{/*     
        <View className='flex border-b-[3px] border-zinc-100 pb-1  w-screen self-center px-6 flex-row  justify-between '
           style={{
                
              marginTop:4,
             
            }}
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
        </View> */}

      
           
                <View id={`${data.$id}`} className='bg-[#F8F8F8] flex-row overflow-hidden p-2 rounded rounded-2xl h-[130] '
                    //    style={{
                    //     shadowColor: "#1a1a1a",
                    //     shadowOffset: {
                    //     width: 0,
                    //     height: 0,
                    //     },
                    //     elevation: 2,
                    //     shadowOpacity: 0.25,
                            
                    //     }}
                >
                    <View className='bg-green-300 flex  pl-4 justify-center h-full w-[35%] rounded rounded-2xl'
                    
                    >
                        <Text className='uppercase  text-lg'
                            style={{
                                fontFamily:"Crispy",
                                color:color.morange,
                                }}
                        >
                            {data.name}
                        </Text>
                        
                    </View>
                    <Text>{data.description}</Text>
                    <View className='h-full w-[65%]'>
                            
                    </View>
                </View>
                    

   </View>
  )
}

export default MenuVendorPanel