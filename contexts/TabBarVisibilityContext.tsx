import React,{createContext, useContext} from "react";
import Animated,{useSharedValue,useAnimatedScrollHandler, useAnimatedStyle, withTiming, Easing} from "react-native-reanimated";

const TAB_BAR_HEIGHT= 120
const TabBarContext = createContext<any>(null);

export function TabBarProvider({children}:{children:React.ReactNode}){
    const translateY = useSharedValue(0)
    const lastOffsetY = useSharedValue(0)
    
    const onScroll = (event:any) => {
        const currentOffsetY = event.nativeEvent.contentOffset.y
        const diff = currentOffsetY - lastOffsetY.value

        if (diff > 3 && currentOffsetY>0) {
            translateY.value = withTiming(TAB_BAR_HEIGHT, {
                duration:200,
                easing:Easing.out(Easing.cubic)
            })
        }
        else if (diff < -3){
            translateY.value = withTiming(0, {
                duration:250,
                easing:Easing.in(Easing.cubic)
            })
        }
        lastOffsetY.value = currentOffsetY

    }

    const animatedStyle = useAnimatedStyle(()=>({
        transform:[{translateY:translateY.value}],
    
    }))

    return (
        <TabBarContext.Provider value={{onScroll, animatedStyle}}>
            {children}
        </TabBarContext.Provider>
    )
}


export function useTabBarVisibility(){
    return useContext(TabBarContext)
}