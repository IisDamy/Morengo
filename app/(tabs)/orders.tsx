import { View, Text, ScrollView, Pressable, Alert, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { color } from '@/constants'
import { TabsHeader } from '@/components'
import { deleteOrder, fetchOrders } from '@/lib/appwrite'
import useAuthStore from '@/store/auth.store'
import { Order } from '@/types'
import { useCartStore } from '@/store/cart.auth.store'
import { subscribeToOrders } from '@/lib/appwrite'

const orders = () => {
  const { user } = useAuthStore()
  const [activeGroup, setActiveGroup] = useState('Pending')
  const orderStage = ['Pending', 'Confirmed', 'Delivered']
  const [openCancelPending, setOpenCancelPending] = useState<string | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const { items } = useCartStore()

  const getOrders = async () => {
    setLoading(true)
    try {
      const ordersRes = await fetchOrders(user?.accountId)
      setOrders(ordersRes)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (items.length === 0) {
      getOrders()
    }
  }, [items])

  useEffect(() => {
    const unsubscribe = subscribeToOrders()
    return () => {
      unsubscribe()
      // getOrders()
    }
    
  }, [])

  const handleCancel = (orderId: string) => {
    Alert.alert('Cancel Order', 'Are you sure you want to cancel this order?', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Yes, Cancel',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteOrder(orderId)
            setOrders((prev) => prev.filter((o) => o.$id !== orderId))
            setOpenCancelPending(null)
          } catch (e) {
            console.error('Cancel order error:', e)
          }
        },
      },
    ])
  }

  return (
    <SafeAreaView className='h-full w-full items-center bg-white'>
      <View className='h-full w-full bg-white flex px-6 items-center'>
        <TabsHeader tabName='Orders' />

        <View className='flex-row w-full mt-12 pb-3 border-b border-zinc-300 justify-between'>
          {orderStage.map((group, index) => (
            <Pressable key={index} onPress={() => setActiveGroup(group)}>
              <Text
                className='py-3 font-bold'
                style={{
                  color: activeGroup === group ? color.moregreen : '#404a3854',
                  fontSize: 14,
                }}
              >
                {group}
              </Text>
            </Pressable>
          ))}
        </View>

        {loading ? (
          <ActivityIndicator className='mt-10' color={color.moregreen} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} className='w-full'>
            {orders.length === 0 && (
              <Text className='text-center text-zinc-400 mt-10'>
                No {activeGroup.toLowerCase()} orders
              </Text>
            )}

            {orders.map((order) => (
              <View key={order.$id}>
                <Pressable
                  onPress={()=> setOpenCancelPending(null)}
                  onLongPress={() =>
                    setOpenCancelPending(openCancelPending === order.$id ? null : order.$id)
                  }
                  delayLongPress={500}
                >
                  <View className='mt-4 w-full border-b p-1 border-zinc-300'>
                    {/* User name + time */}
                    <View className='flex-row justify-between mb-2'>
                      <Text className='text-[13px] font-bold text-zinc-700'>{user?.name}</Text>
                      <Text className='text-[12px] text-zinc-400'>
                        {new Date(order.$createdAt).toLocaleTimeString('en-GB', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                        {' · '}
                        {new Date(order.$createdAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </Text>
                    </View>

                    {/* Order items */}
                    {order.items.map((item, idx) => (
                      <View key={`${order.$id}-${idx}`} className='pb-4 flex-row gap-4'>
                        <Image
                          source={{ uri: item.image }}
                          className='rounded-[10] h-20 w-20 bg-zinc-200'
                          resizeMode='cover'
                        />
                        <View className='flex-row w-[230] justify-between'>
                          <View className='flex gap-3'>
                            <Text className='text-[14px] font-bold'>{item.fullName}</Text>
                            <Text className='text-[12px] font-bold'>{order.userAddress}</Text>
                          </View>
                          <Text className='text-[13px] font-bold' style={{ color: color.moregreen }}>
                            ₦{item.price * item.quantity}
                          </Text>
                        </View>
                      </View>
                    ))}
                     {openCancelPending === order.$id && (
                  <Pressable
                    onPress={() => handleCancel(order.$id)}
                    className='bg-red-500 mb-2 rounded-[5] py-3 items-center'
                  >
                    <Text className='text-white tracking-wide text-md font-bold'>Cancel</Text>
                  </Pressable>
                )}
                  </View>
                </Pressable>

               
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  )
}

export default orders
