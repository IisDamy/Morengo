import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'

const categories = [
    {
        id:'0',
        rating:'4.5',
        name:'Shawarma',
        vendor:'item-7'
    },
      {
        id:'1',
        rating:'4.5',
        name:'Jollof Rice',
        vendor:'uchis'
    },
      {
        id:'0',
        rating:'4.5',
        name:'meat roll',
        vendor:'nutri c'
    },
      {
        id:'0',
        rating:'4.5',
        name:'fried rice',
        vendor:'item-7'
    },
      {
        id:'0',
        rating:'4.5',
        name:'amala and egusi',
        vendor:'buka 7'
    },
      {
        id:'0',
        rating:'4.5',
        name:'spag and chicken',
        vendor:'spag-city'
    }
]

 interface MenuFavouritePanelProps{
    seeAll:boolean
 }




const MenuFavouritePanel = ({seeAll}:MenuFavouritePanelProps) => {
// clcking items links to buy item page, also holding brinngs out add to cart option


  return (
    <View className=' mt-4 mb-3  w-screen pl-5 '>
        <ScrollView horizontal={true} 
        showsHorizontalScrollIndicator={false}
        >
           {categories.map((item) =>
        //    bigger view shows price
        <View className={` rounded bg-[#F8F8F8]  p-2 mx-1 my-2  w-[240] h-[220] rounded-3xl mr-6 `}
            style={{
            
            shadowColor: "#1a1a1a",
            shadowOffset: {
              width: -5,
              height: 4,
            },
            elevation: 1,
            shadowOpacity: 0.25,
                 
            }}
        >
            {/* image */}
            <View className='w-full h-[130] rounded rounded-3xl bg-zinc-400'></View>

            <View className='w-full flex items-center flex-row justify-between mt-2'>
                <View className='flex w-fit max-w-[150] items-start px-2 flex-col   '>      
                <Text className='font-bold text-lg'>{item.name} </Text> 
                <TouchableOpacity>
                    <Text className='text-sm mt-1 font-bold text-green-300 w-[100]'> {item.vendor}</Text>
                </TouchableOpacity>
                <Text className='text-sm mt-1 font-bold text-green-300'>
                   ⭐ {item.rating} 
                </Text>
            </View>
            <View>  
                <View className='flex items-center'>

                    <Text className='text-xs text-orange-300 text-center'>
                        {/* returns either open or closed */}
                    open / closed:</Text>
                    <Text className='text-sm mb-2 text-orange-300'>12 - 4</Text>
                    {/* dosen't show if location is turned off, also don't forget to add location symbol */}
                    <Text className='rounded bg-pink-200 py-1 px-3 text-xs rounded-full'>120m</Text> 
                </View>
                 
            </View>
            </View>
        </View>)}
        </ScrollView>
          
    </View>
  )
}

export default MenuFavouritePanel