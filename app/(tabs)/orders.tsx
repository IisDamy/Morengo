import { View, Text, ScrollView, Pressable } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { color } from '@/constants'
import { TabsHeader } from '@/components'
// long hold pending to cancel order
// after we're done with everything, slide animatiion between header groups

const orders = () => {
  const [activeGroup, setActiveGroup] = useState('Pending')
  const orderStage = ['Pending','Confirmed', 'Delivered']
  const [openCancelPending, setOpenCancelPending] = useState(false)
  return (
    <SafeAreaView className='h-full w-full items-center'>
      
        <Pressable onPress={()=> setOpenCancelPending(false)}>
        <View className='h-full w-full bg-white flex px-6 items-center'>
                <TabsHeader tabName='Orders'/>

                
                <View className='flex-row w-full mt-12 pb-3 border-b border-zinc-300 justify-between'>
                   {orderStage.map((group, index) =>
                  

                      <Pressable onPress={()=>setActiveGroup(group)}>
                                  <Text id={`${index}`} className={` py-3  font-bold`}
                                      style={{
                                          color: activeGroup === group?color.moregreen:'#404a3854',
                                          fontSize:14
                                      }}
                                  >{group}</Text>
                      </Pressable>
                                
                              )}
                </View>
                  <ScrollView
                  showsVerticalScrollIndicator={false}
                  
                  >
                      {/* orders */}
                  <Pressable  onPress={() => setOpenCancelPending(false)}
                              onLongPress={()=> setOpenCancelPending(true)}
                              delayLongPress={500}
                              >
                  <View className='mt-4 w-fit border-b p-1 border-zinc-300'>
                  <View className=' pb-4 flex-row gap-4 '>
                    {/* img */}
                    <View className='bg-zinc-300 rounded-[10]  h-20 w-20'>
          
                    </View>
                    {/* details */}
                    <View className='flex-row w-[230] justify-between'>
                        <View className='flex gap-3 '>
                      {/* modified */}
                      <Text className='text-[14px] font-bold'>Jollof rice and Chicken</Text>
                      <Text className='text-[12px] font-bold'>Item-7</Text>
                      <Text className='text-[12px]'>27 Feb 2026</Text>
                 
                    </View>

                              {/* Price */}
                        <Text className='text-[13px]  font-bold '
                          style={{
                            color:color.moregreen
                          }}
                        >$3000</Text>
                    </View>
                  </View>
                         {openCancelPending && 
                         <Text className='bg-red-500 text-white tracking-wide text-md mb-2 rounded-[5] py-3 text-center font-bold p-2 '>
                            Cancel
                          </Text>}
                  </View>
                  </Pressable>


              <View className='w-fit border-b pb-4 border-zinc-300 flex-row gap-4 p-1  mt-4'>
                    {/* img */}
                    <View className='bg-zinc-300 rounded-[10]  h-20 w-20'>
          
                    </View>
                    {/* details */}
                    <View className='flex-row w-[230] justify-between'>
                        <View className='flex gap-3 '>
                      {/* modified */}
                      <Text className='text-[14px] font-bold'>Jollof rice and Chicken</Text>
                      <Text className='text-[12px] font-bold'>Item-7</Text>
                      <Text className='text-[12px]'>27 Feb 2026</Text>
                 
                    </View>

                              {/* Price */}
                        <Text className='text-[13px]  font-bold '
                          style={{
                            color:color.moregreen
                          }}
                        >$3000</Text>
                    </View>
                  </View>
              </ScrollView>
        </View>
      </Pressable>
    </SafeAreaView>
  )
}

export default orders