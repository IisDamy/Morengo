import { View, Text, ScrollView, Image, TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'
import { getMenuItems } from '@/lib/appwrite'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import MenuItemCartAddPopUp from './MenuItemCartAddPopUp'
import { getModifierOptions } from '@/lib/appwrite'


interface MenuFavouritePanelProps {
  seeAll: boolean
}

// Tracks each selected modifier and its quantity
interface SelectedModifier {
  $id: string
  name: string
  qty: number
}

const MenuFavouritePanel = ({ seeAll }: MenuFavouritePanelProps) => {

  const [menuItems, setMenuItems] = React.useState([])
  const [openItemCartAdd, setOpenItemCartAdd] = React.useState(false)
  const [selectedItem, setSelectedItem] = React.useState(null)



  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await getMenuItems({ category: true })
        if (!res) throw new Error('No menu item exists currently')
        setMenuItems(res)
      } catch (e) {
        console.log(e)
      }
    }
    fetchMenuItems()
  }, [])



  const handleSelectItem = async (item) => {
    setSelectedItem(item)
    setOpenItemCartAdd(true)
  }


  return (
    <View className='mt-4 mb-3 w-screen pl-5'>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {menuItems?.slice(0, 4).reverse().map((item) =>
          <View
            className='rounded bg-[#F8F8F8] p-2 mx-1 my-2 w-[240] h-[220] rounded-3xl mr-6'
            key={item?.$id}
            style={{
              shadowColor: "#1a1a1a",
              shadowOffset: { width: -5, height: 4 },
              elevation: 2,
              shadowOpacity: 0.25,
            }}
          >
            <TouchableOpacity onPress={() => handleSelectItem(item)}>
              <Image source={{ uri: item.image }} className='w-full h-[130] rounded rounded-3xl' />
            </TouchableOpacity>

            <View className='w-full flex flex-row mb-2 justify-between mt-2'>
              <View className='flex w-fit gap-[0.5] justify-between self-start px-2 flex-col'>
                <TouchableOpacity>
                  <Text className='font-bold text-md'>{item?.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text className='text-sm mt-1 font-bold text-green-400 w-[100]'>{item.vendors?.name}</Text>
                </TouchableOpacity>
                <Text className='text-sm mt-1 text-green-400'>₦{item.price}</Text>
              </View>

              <View>
                <View className='flex items-center mt-2'>
                  <Text className='text-xs text-orange-300 text-center'>open / closed:</Text>
                  <Text className='text-sm text-orange-300'>12 - 4</Text>
                  <View className='flex-row items-center mt-1'>
                    <MaterialIcons name='star' color={'gold'} />
                    <Text className='text-sm text-red-300'>{item.rating} 4.5</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>


      <MenuItemCartAddPopUp 
      visible={openItemCartAdd} 
      onClose={() => setOpenItemCartAdd(false)} 
      selectedItem={selectedItem} 
      />
       
    </View>
  )
}

export default MenuFavouritePanel
