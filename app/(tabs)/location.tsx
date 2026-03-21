import React, { useState, useRef, useEffect, } from 'react'
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator
} from 'react-native'
import {
  MapView,
  MarkerView,
  setAccessToken,
  Camera
} from '@maplibre/maplibre-react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import * as Location from 'expo-location'
import { color, images } from '@/constants'
import useAuthStore from '@/store/auth.store'
import Animated from 'react-native-reanimated'
import AddLocation from '@/components/AddLocation'



setAccessToken(null)
const MAPTILER_API_KEY = 'VxYaCVeWIAg0nfKZljWY'
const UNIVERSITY_OF_ILORIN_COORDS = [4.5418, 8.4799]

const location = () => {
  const {user} = useAuthStore()
  const cameraRef = useRef(null)
  const [mapCoords, setMapCoords] = useState(UNIVERSITY_OF_ILORIN_COORDS)
  const [searchText, setSearchText] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [userLocation, setUserLocation] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaveUserOpened, setIsSaveUserOpened] = useState(false)

  // Debounce timeout ref
  const searchTimeout = useRef(null)

  // Cleanup timeout on unmount
  useEffect(() => {
  if (searchTimeout.current) clearTimeout(searchTimeout.current)
   goToUserLocation()
  }, [])

  /* =========================
     SEARCH (MapTiler + Nigeria Bias) – with debounce
  ========================== */
  const performSearch = async (text: string) => {

    try {
      const response = await fetch(
        `https://api.maptiler.com/geocoding/${encodeURIComponent(
          text
        )}.json?country=ng&limit=5&key=${MAPTILER_API_KEY}&autocomplete=true&limit=3&country=ng`
      )



// add suggestions from vendors

      const data = await response.json()

      if (data.features) {
        setSuggestions(data.features)
      } else {
        setSuggestions([])
      }
    } catch (err) {
      console.log('Search error:', err)
    }
  }


  const handleSearch = (text: string) => {
    setSearchText(text)

    // Clear previous timeout
    if (searchTimeout.current) clearTimeout(searchTimeout.current)

    if (text.length < 2) {
      setSuggestions([])
    } else {
      // Set new debounced search
      searchTimeout.current = setTimeout(() => {
        performSearch(text)
      }, 300) // 300ms delay
    }
  }

  const handleSelectLocation = (item: any) => {
    const coords = item.center

    setMapCoords(coords)
    setSearchText(item.place_name)
    setSuggestions([])
    setIsFocused(false)
  }

  /* =========================
     USER LOCATION
  ========================== */
  const goToUserLocation = async () => {
    setIsLoading(true)
    try {
      const { status } = await Location.getForegroundPermissionsAsync()
    if (status !== 'granted') {
      const { status: newStatus } = await Location.requestForegroundPermissionsAsync()

      if (newStatus !== 'granted') {
        console.log('Permission denied')
        return
      }
    }

      const currentLocation = await Location.getCurrentPositionAsync({})
     
      const coords = [
        currentLocation.coords.longitude,
        currentLocation.coords.latitude,
      ]
      console.log(coords)
      setMapCoords(coords)
      setUserLocation(coords)
    } catch (error) {
    
      console.log('Location error:', error)
    }
    finally{
      setIsLoading(false)
    }
  }

 

  return (
    <View className="flex-1 items-center">
      <MapView
        style={{ flex: 1,
          width:'100%'
         }}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?country=ng&key=${MAPTILER_API_KEY}`}
        logoEnabled={false}
        compassEnabled={false}
        
      >
        <Camera
          ref={cameraRef}
          zoomLevel={16}
          centerCoordinate={mapCoords}
        />

       {!isLoading && 
       <TouchableOpacity>
        <MarkerView coordinate={mapCoords}>
         <Image source={images.location} className='w-8 h-8'/>
        </MarkerView>
       </TouchableOpacity>
       }

         {/* {userLocation && (
          <MarkerView coordinate={userLocation}>
            <View className="w-5 h-5 rounded-full bg-blue-500 border-2 border-white" />
          </MarkerView>
        )} */}

        {/* {savedLocation && (
          <MarkerView coordinate={savedLocation}>
            <View className="w-5 h-5 rounded-full border-2 border-white" />
          </MarkerView>
        )}  */}
      </MapView>

      {/* SEARCH */}
      <View className="w-full px-12 items-center absolute top-16">
        <TextInput
          value={searchText}
          onChangeText={handleSearch}
          
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full py-5 p-4 bg-white opacity-[86%] rounded-full"
        />

       
          {!isFocused && <Ionicons
            name="search-outline"
            size={24}
            color="#979799"
            className={`mr-[2] top-[25%] left-16 absolute ${!searchText?'opacity-1':'opacity-0'}`}
          />}
      

        {suggestions &&
          <View className="w-full  top-[52] absolute bg-white mt-2 rounded-[15] overflow-hidden">
            {suggestions.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelectLocation(item)}
                className="p-4  border-b border-gray-300"
              >
                <Text numberOfLines={1}>
                  {item.place_name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        }
      </View>

      

      {/* SIDE BUTTONS */}
      <View className="absolute top-[25%] right-[30] items-center gap-10">
        <TouchableOpacity onPress={() => setIsSaveUserOpened(prev => !prev)}>
          <View className="w-11 h-10 border justify-center items-center border-orange-500 border-[2px] bg-orange-300 rounded-[12]">
            <Text className="text-3xl text-white">+</Text>
          </View>
        </TouchableOpacity>
         <AddLocation isOpened={isSaveUserOpened} coords={mapCoords}/>

{/*for admin and deliveryperson role  */}
        <TouchableOpacity onPress={()=>{}}>
          <View className="rounded-full bg-orange-300 justify-center items-center w-11 border-orange-500 border-[2px] h-11 border">
            <MaterialIcons
              name='add-location-alt'
              color={'white'}
              size={20}
            />
          </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={goToUserLocation}>
          <View className="rounded-full bg-orange-300 justify-center items-center w-11 border-orange-500 border-[2px] h-11 border">
            <MaterialIcons
              name='gps-fixed'
              color={'white'}
              size={20}
            />
          </View>
        </TouchableOpacity>
      </View>


      {isLoading && <ActivityIndicator 
      className='top-[50%] absolute '
      size={'large'}
      color={'#4386e3'}
      />}
    </View>
  )
}

export default location