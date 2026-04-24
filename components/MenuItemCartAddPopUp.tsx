
import { MenuItem, ModifierOptions } from "@/types";
import React, { useCallback, useEffect } from "react";
import {
  Dimensions, Modal,TouchableWithoutFeedback, View, TouchableOpacity, Text, TextInput, Image, type ViewStyle,
} from "react-native";

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { getModifierOptions } from "@/lib/appwrite";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomButton from "./CustomButton";
import { useCartStore } from "@/store/cart.auth.store";
import { buildOrderString, formatNaira } from "@/constants/utils";


const { height: SCREEN_HEIGHT } = Dimensions.get("window");


const SHEET_HEIGHT = SCREEN_HEIGHT * 0.6;



const SNAP_SPRING_CONFIG = {
  damping: 20,
  stiffness: 200,
  mass: 0.8,
};

const CLOSE_SPRING_CONFIG = {
  damping: 18,
  stiffness: 150,
  mass: 0.7,
};

interface SelectedItem {
    name: string;
    price: number;
    image: string;
    vendors: any;
    id: string | null;
}

interface MenuItemCartAddPopUpProps {
  visible: boolean;
  onClose: () => void;
  sheetStyle?: ViewStyle;
  selectedItem: SelectedItem | null;
}

interface SelectedModifier {
  $id: string
  name: string
  qty: number
  price: number
}


const MenuItemCartAddPopUp: React.FC<MenuItemCartAddPopUpProps> = ({
  visible,
  onClose,
  selectedItem,
  sheetStyle,
}) => {
  const {addItem} = useCartStore()

  const [qty, setQty] = React.useState(1)
  const [specialInstructions, toggleSpecialInstructions] = React.useState(false)
  const [openSides, toggleOpenSides] = React.useState(false)
    const [selectedModifiers, setSelectedModifiers] = React.useState<SelectedModifier[]>([])
    const [modifierOptions, setModifierOptions] = React.useState<ModifierOptions[]>([])
  const translateY = useSharedValue(SHEET_HEIGHT);

  const overlayOpacity = useSharedValue(0);

  const triggerClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const animateClose = useCallback(() => {
    "worklet";
    overlayOpacity.value = withTiming(0, { duration: 220 });
    translateY.value = withSpring(SHEET_HEIGHT, CLOSE_SPRING_CONFIG, (done) => {
      if (done) scheduleOnRN(triggerClose);
    });
  }, [overlayOpacity, translateY, triggerClose]);


  useEffect(()=>{
    toggleOpenSides(false)
    toggleSpecialInstructions(false)
    setQty(1)
    const handleOpen = async () => {
        setSelectedModifiers([]) // reset modifiers when opening a new item
    await handleModifierOptions(selectedItem.vendors?.$id)
    }
    handleOpen()
  },[triggerClose])

  useEffect(() => {
    if (visible) {
      translateY.value = SHEET_HEIGHT;
      overlayOpacity.value = 0;

      translateY.value = withSpring(0, SNAP_SPRING_CONFIG);
      overlayOpacity.value = withTiming(1, {
        duration: 280,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      translateY.value = SHEET_HEIGHT;
      overlayOpacity.value = 0;
    }
  }, [visible]); 

  

  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const handleOverlayPress = useCallback(() => {
    animateClose();
  }, [animateClose]);



  const handleModifierPress = (option: { $id: string; name: string, price: number }) => {
    setSelectedModifiers((prev) => {
      const existing = prev.find((m) => m.$id === option.$id)
      if (existing) {
        // Already selected — bump the quantity
        return prev.map((m) =>
          m.$id === option.$id ? { ...m, qty: m.qty + 1 } : m
        )
      }
      // New modifier — add with qty 1
      return [...prev, { ...option, qty: 1}]
    })
  }

  const handleModifierOptions = async (vendorId: string) => {
    try {
      const res = await getModifierOptions({ query: vendorId })
      const options = res.map((opt) => ({ $id: opt.$id, name: opt.name, price: opt.price}))
      if (!res) throw new Error('No modifier options found for this item')
      setModifierOptions(options)
  
    } catch (e) {
      console.error(e)
    }
  }
 
  
    // Builds the display string: "Shawarma + 2 Coke + 1 Bottle Water"
    // const buildOrderString = (): string => {
    //   if (!selectedItem) return ''
    //   const base = selectedItem.name
    //   if (selectedModifiers.length === 0) return base
    //   const modifierParts = selectedModifiers.map((m) => `${m.qty} ${m.name}`)
    //   return `${base} + ${modifierParts.join(' + ')}`
    // }
  

  return (
    
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleOverlayPress}
    >
    
        <TouchableWithoutFeedback onPress={handleOverlayPress}>
          <Animated.View
            className="absolute inset-0 bg-black/55"
            style={overlayAnimatedStyle}
          />
        </TouchableWithoutFeedback>

   
        
          <Animated.View
            className="w-full absolute bottom-0 bg-white rounded-t-3xl overflow-hidden shadow-2xl"
            style={[{ height: SHEET_HEIGHT }, sheetAnimatedStyle, sheetStyle]}
          >
            <View
              className="w-full items-center pt-3 pb-1"
              pointerEvents="none"
            >
              <View className="w-10 h-1 rounded-full bg-neutral-300" />
            </View>
          
            <View className="flex-1  px-5 py-2">
                 <KeyboardAwareScrollView className='flex-1 h-full'
        keyboardShouldPersistTaps="handled"
         enableOnAndroid
  extraScrollHeight={120}
        >

          <View className='flex-row w-full border-b border-zinc-100 py-4 gap-8'>
            <Image source={{ uri: selectedItem?.image }} className='w-32 h-28 rounded rounded-3xl' />
            <View className='gap-1'>
              <Text className='font-bold uppercase w-[185] flex-wrap'>{buildOrderString(selectedItem, selectedModifiers)}</Text>
              <Text className='font-bold text-green-400'>{selectedItem?.vendors?.name}</Text>
              <Text className='mt-2 font-medium'>Price: {formatNaira(selectedItem?.price)}</Text>
            </View>
          </View>

          <View className='flex-row justify-between py-4 items-center border-zinc-100 border-b w-full'>
            <Text>Quantity</Text>
            <View className='py-2 w-[100] items-center justify-around flex-row'>
                <TouchableOpacity onPress={() => setQty(prev => prev > 1?prev - 1: prev)}>
                    <MaterialIcons name='remove-circle' size={24} color={'green'} />
                </TouchableOpacity>
              <Text className='font-bold'>{qty}</Text>
              <TouchableOpacity onPress={() => setQty(prev => prev + 1)}>
                <MaterialIcons name='add-circle' size={24} color={'green'} />
              </TouchableOpacity>
              
            </View>
          </View>

          <View className='border-b border-zinc-100 py-4'>
            <TouchableOpacity
              className='flex-row gap-2 mb-2 items-center'
              onPress={() => toggleOpenSides(!openSides)}
            >
              <MaterialIcons name='add-circle' size={24} color={'gold'} />
              <Text>Add sides and beverages</Text>
            </TouchableOpacity>

            {openSides && (
              <View className='flex-wrap px-12 mt-4 flex-row gap-2'>
                {modifierOptions?.map((option) => {
                  // Find if this modifier is already selected so we can show its qty
                  const selected = selectedModifiers.find((m) => m.$id === option.$id)
                  return (
                    <TouchableOpacity
                      key={option.$id}
                      className={`p-2 rounded border w-fit h-fit ${selected ? 'border-green-400 bg-green-50' : ''}`}
                      onPress={() => handleModifierPress(option)}
                    >
                      <Text>{option.name}{selected ? ` (${selected.qty})` : ''}</Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
            )}
          </View>

          <TouchableOpacity className='flex-row gap-2 items-center py-4' onPress={()=>toggleSpecialInstructions(prev => !prev)}>
            <MaterialIcons name='add-circle' size={24} color={'gold'} />
            <Text>Add special instructions</Text>
          </TouchableOpacity>
            {specialInstructions && <TextInput className='bg-white border-zinc-300 h-[50] border rounded-[8] ' multiline={true}/>}

          <CustomButton style={'bg-blue-300 mt-12 mb-14'} title='Add to cart' onPress={()=> {
           
            addItem({qty:qty, item:{...selectedItem,fullName: buildOrderString(selectedItem, selectedModifiers), modifierOptions:selectedModifiers ?? []}})
            animateClose()
        }}/>

        </KeyboardAwareScrollView>
              </View>
          </Animated.View>
        
    </Modal>
    
  );
};

export default MenuItemCartAddPopUp;
