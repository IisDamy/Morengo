import { View, Text, Pressable, ScrollView } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { NotificationBell } from '@/components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { color } from '@/constants'

// if cart is empty return empty cart display, just a picture of a cart, or some cute animation,or image and buttom bellow with + add items

const cart = () => {
  return (
  
    <SafeAreaView className='h-full w-full flex'>
      <ScrollView className=' '>
        <View className='flex bg-white justify-center px-6 items-center'>
           <View className='w-full pt-4 items-center flex-row mt-2 px-2 justify-between'>
              <Pressable onPress={()=> router.back()}>
                {/* view should show slight tint color when clicked, pressable effect */}
            <View className='p-2 rounded-full border'>
               <MaterialIcons
                    name="keyboard-arrow-left"
                    size={20}
                  
                    className="relative  "
                  />
            </View>
            
        </Pressable>
         
        <Text className='font-bold'>My Cart</Text>
 
        <NotificationBell color1='black' color2='black'/>
        
      </View>

     
      {/*scrollable flatlist retirning cart items
      **shows scrollbar to let user know it's scrollable
       */}
      <View className='w-full'>

        {/* individual item */}
        <View className='w-full  flex-row gap-4 p-1  mt-8'>
          {/* img */}
          <View className='bg-zinc-300 rounded-[10]  h-24 w-24'>

          </View>
          {/* details */}
          <View className='flex gap-3 '>
            {/* modified */}
            <Text className='text-[14px]'>Jollof rice and Chicken</Text>
            <Text className='text-[12px] font-bold'>Item-7</Text>

              
            <View className='flex-row items-center w-[200] justify-between'>
              {/* Price */}
              <Text className='text-[13px] font-bold '
                style={{
                  color:color.moregreen
                }}
              >$3000</Text>

                {/* changing qty of order */}
              <View className='border rounded-[8] py-2   w-[78] justify-around flex-row'>
                <Text className='font-bold text-center text-red-400 h-full w-[35%]'>-</Text>
                <Text className='font-bold'>1</Text>
                <Text className='font-bold w-[35%] h-full text-green-300 text-center'>+</Text>
              </View>
            </View>
          </View>
        </View>

          {/* individual item */}
          <View className='w-full  flex-row gap-4 p-1  mt-8'>
          {/* img */}
          <View className='bg-zinc-300 rounded-[10]  h-24 w-24'>

          </View>
          {/* details */}
          <View className='flex gap-3 '>
            {/* modified */}
            <Text className='text-[14px]'>Jollof rice and Chicken</Text>
            <Text className='text-[12px] font-bold'>Item-7</Text>

              
            <View className='flex-row items-center w-[200] justify-between'>
              {/* Price */}
              <Text className='text-[13px] font-bold '
                style={{
                  color:color.moregreen
                }}
              >$3000</Text>

                {/* changing qty of order */}
              <View className='border rounded-[8] py-2   w-[78] justify-around flex-row'>
                <Text className='font-bold text-center text-red-400 h-full w-[35%]'>-</Text>
                <Text className='font-bold'>1</Text>
                <Text className='font-bold w-[35%] h-full text-green-300 text-center'>+</Text>
              </View>
            </View>
          </View>
        </View>

        {/* checkout area */}
        {/* change color of border to softer */}
        <View className='mt-24   border-t border-zinc-300'>
            <View className='flex my-4 gap-3'>
              <View className='flex-row  w-full justify-between'>
                <Text className='text-lg'>Item Total</Text>
                <Text className='text-lg'>$10000</Text>
              </View>
              
              <View className='flex-row justify-between '>
                <Text className='text-lg'>Discount</Text>
                <Text className='text-lg'>0</Text>
              </View>
              <View className='flex-row justify-between '>
                <Text className='text-lg'>Delivery Fee</Text>
                <Text className='text-lg'>500</Text>
              </View>
            </View>
            
            <View className='flex-row mt-2 py-4 border-b border-zinc-300 border-t w-full justify-between'>
              <Text className='text-xl  tracking-wide font-bold'
                style={{
                  color:color.moregreen
                }}
              >TOTAL</Text>
              <Text className='text-xl font-bold'
                style={{
                  color:color.moregreen
                }}
              >$10000</Text>
            </View>
        </View>

        {/* change delivery */}
        <View className='my-6 justify-between flex-row '>
          <View className='flex-row gap-4'>
                 {/* img of mini map */}
          <View className='h-20 w-20 rounded-[10] bg-zinc-300'></View>

          <View className=''>
            <View className='gap-1 '>
              <View className='flex-row'>
                <Text className='font-bold'>Deliver to:</Text>
                {/* below text isnt returned if location isn't saved with name eg home, work, */}
                <Text className='font-bold'>Home</Text>
              </View>
              
              <Text className='text-sm mt-2'>Google maps location text</Text>
            </View>
          </View>
          </View>
         

          <Text className='font-bold text-green-300'>Change</Text>
        </View>
      </View>

           <View className='mb-12 mt-4 h-16  flex-row items-center justify-around  rounded-[15] mx-3 w-full '
          style={{
            backgroundColor:color.morange
          }}
        >
          <Text className='text-white font-bold'>Checkout</Text>
          <Text className='text-white font-bold'>$10000</Text>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default cart 