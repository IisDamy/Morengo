// to wrap sign sign in
// sign in is pop up that pops on dashboard if user is logged outswss           


import { Modal, View, Text, Pressable, ScrollView } from "react-native";
import React,{ useState, ReactNode } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { images } from "@/constants";
interface PopUpWrapperProps {
  children: ReactNode,
  open:boolean,
  handleOpen: () => void
}

 const PopupWrapper: React.FC<PopUpWrapperProps> = ({children, open, handleOpen}) => {
  

  return (
    <>
      <Modal transparent animationType="fade" visible={open}>
        <View style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.4)",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <View style={{
            backgroundColor: "#fff",
            justifyContent: "center",
          alignItems: "center",
            padding: 18,
            paddingTop:25,
            borderRadius: 15,
          }}>
              <Pressable onPress={handleOpen}>
              <MaterialIcons name='close' color={'#EF4444'} size={30} className="absolute self-center z-2 top-[230]  "/>
            </Pressable>

            {children}
          </View>
        </View>
      </Modal>
    </>
  );
}


export default PopupWrapper