import { View, TouchableOpacity, Text } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { color } from '@/constants';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';

const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

interface PointsIconProps {
  points?: number; // 0 to 50 (undefined treated as 0)
}

const PointsIcon: React.FC<PointsIconProps> = ({ points = 0 }) => {
  // Clamp to valid range (0–50)
  const clampedPoints = Math.min(50, Math.max(0, points));

  // Keep current value in a ref for safe access inside animation callbacks
  const pointsRef = useRef(clampedPoints);
  useEffect(() => {
    pointsRef.current = clampedPoints;
  }, [clampedPoints]);

  // Shared values
  const fillerHeight = useSharedValue(
    clampedPoints < 50 ? (clampedPoints / 50) * 24 : 0
  );
  const borderColor = useSharedValue(clampedPoints === 50 ? color.morange : 'gold');
  const iconColor = useSharedValue(clampedPoints === 50 ? color.morange : 'gold');
  const iconScale = useSharedValue(1);
 
  // Trigger animations when points change
  useEffect(() => {
    const current = clampedPoints;

    if (current < 50) {
      // Points below 50: filler rises, colours return to gold, scale resets
      fillerHeight.value = withTiming((current / 50) * 24, { duration: 200 });
      borderColor.value = withTiming('gold', { duration: 200 });
      iconColor.value = withTiming('gold', { duration: 200 });
      iconScale.value = withTiming(1, { duration: 200 });
    } else {
      // Points === 50: filler disappears, then colour change and bulge
      fillerHeight.value = withTiming(0, { duration: 200 }, (finished) => {
        // Only proceed if still at 50 when the filler animation finishes
        if (finished && pointsRef.current === 50) {
          borderColor.value = withTiming(color.morange, { duration: 200 });
          iconColor.value = withTiming(color.morange, { duration: 200 });
          iconScale.value = withSequence(
            withTiming(0.8, { duration: 100, easing: Easing.out(Easing.quad) }),
            withTiming(1.3, { duration: 400, easing: Easing.out(Easing.quad) }),
            // withTiming(1.2, { duration: 100, easing: Easing.in(Easing.quad) })
          );
        }
      });

      
    }
  }, [clampedPoints]);

  // Animated styles
  const fillerStyle = useAnimatedStyle(() => ({
    height: fillerHeight.value,
    backgroundColor: '#14a54a',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  }));

  const parentStyle = useAnimatedStyle(() => ({
    borderColor: borderColor.value,
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value },
    ],
  }));

  const iconAnimatedProps = useAnimatedProps(() => ({
    color: iconColor.value,
  }));

const [pointsVisible, setPointsVisible] = React.useState(false);
  

  return (
    <>
    <TouchableOpacity onPress={()=>setPointsVisible((prev) => !prev)} >
      <Animated.View
        className="border overflow-hidden rounded-full flex items-center justify-center w-6 h-6"
        style={parentStyle}
      >
        {/* Filling element – rises with points */}
        <Animated.View style={fillerStyle} />

        {/* Sparkle icon – colour and scale are animated */}
        <AnimatedIonicons
          name="sparkles"
          size={12}
          animatedProps={iconAnimatedProps}
          style={iconStyle}
        />
      </Animated.View>
    </TouchableOpacity>

        {/* add smooth transition */}
      <Text className='absolute text-xs  text-white rounded-[5] right-[74]  p-2 bg-zinc-700'
        style={{opacity: pointsVisible ? 0.75 : 0,}}
      >
        points: {clampedPoints}
      </Text>
  
    </>
  );
};

export default PointsIcon;