// to wrap sign sign in
// sign in is pop up that pops on dashboard if user is logged outswss           


import { Modal, View, Text, Pressable, ScrollView } from "react-native";
import React,{ useState, ReactNode } from "react";

interface PopUpWrapperProps {
  children: ReactNode
}

 const PopupWrapper: React.FC<PopUpWrapperProps> = ({children}) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Pressable onPress={() => setVisible(true)}>
        <Text>Open popup</Text>
      </Pressable>

      <Modal transparent animationType="fade" visible={visible}>
        <View style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.4)",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <View style={{
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 12,
            width: "80%"
          }}>
            <Text>Hello popup 👋</Text>

            <Pressable onPress={() => setVisible(false)}>
              <Text>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}


export default PopupWrapper