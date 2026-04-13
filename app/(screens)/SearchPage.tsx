import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SearchBar } from '@/components'


const SearchPage = () => {
  return (
    <SafeAreaView>
      <View className='flex-row'>
      <SearchBar />
      <Text>Exit</Text>
      </View>
      
      <View>
        <View className='flex-row'>
          <Text>History</Text>
          <Text>Clear All</Text>
        </View>
      
      <View>
        <Text></Text>
      </View>

    </View>
    </SafeAreaView>
   
  )
}

export default SearchPage