import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import React,{useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SearchBar } from '@/components'
import Filter from '@/components/Filter'
import {MenuItem} from "@/types";
import { getMenuItems, getVendors } from '@/lib/appwrite';
import { useAppwrite } from '@/lib/useAppwrite';
import MenuVendorPanel from '@/components/MenuVendorPanel'


// add another query so veendors are only rendered when routed from see more, else return hisory, and clear or customizations or common searchs
const SearchPage = () => {
  const { category, query, vendors } = useLocalSearchParams<{query: string; category: string, vendors:string}>()
  const { data, refetch, loading } = useAppwrite({ fn: getMenuItems, params: { query, vendors} });
    const { data:dataVendors, refetch:refetchVendors, loading:loadingVendors } = useAppwrite({ fn: getVendors, params: { } });

useEffect(() => {
    console.log(query, category, vendors)
        refetch({ query, vendors})
        refetchVendors({})
        
    }, [category, query, vendors]);



  return (
    <SafeAreaView className=' '>
        <FlatList
            data={query || vendors ? data : dataVendors} 
            keyExtractor={(item) => item.$id}
            columnWrapperClassName={query || vendors ?"gap-7":undefined}
            numColumns={query || vendors ? 2 : 1}
            contentContainerClassName="gap-7 px-6 p-4 pb-32"
            renderItem={({item, index}) => {
              if (query || vendors) {
                return (
                  <View id={`${item.$id}`} className='bg-[#F8F8F8] overflow-hidden p-2 rounded rounded-2xl h-[120] '
                         >
                          <Text>
                            {item.name}
                          </Text>
                         </View>)
              }
              else {
                return (
                 <MenuVendorPanel data={item} />
              )
              }
            }}
            ListHeaderComponent={ () => (
            <View className='flex-row w-full   justify-between items-center  mb-4'>
        <SearchBar />
        <TouchableOpacity >
                <Text className='mx-2 text-md'>Exit</Text>
        </TouchableOpacity>
        
    </View>
            )}
        />
    </SafeAreaView>
   
  )
}

export default SearchPage