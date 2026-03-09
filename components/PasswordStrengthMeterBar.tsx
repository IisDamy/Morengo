import React, { useEffect, useMemo } from "react";
import { Text, View } from "react-native";
import zxcvbn from "zxcvbn";
import { Alert } from "react-native";

interface Props {
  password: string;
  onStrengthChange?: (score: number) => void;

}

const PasswordStrengthMeter = ({ password, onStrengthChange}: Props) => {
  // 1. Calculate score using zxcvbn (0-4 score)

    const score = useMemo(() => {
    if (!password) return -1;
    return zxcvbn(password).score;
  }, [password]);

  
  useEffect(()=>{

      if (onStrengthChange) {
      onStrengthChange(score);
    
  }
  },[score, onStrengthChange])


  // 2. Define Tailwind classes based on score
  const strengthConfig = useMemo(() => {
    switch (score) {
      case 0:
        return {
          label: "Weak",
          widthClass: "w-1/4",
          bgClass: "bg-red-500",
          textClass: "text-red-500",
        };
      case 1:
        return {
          label: "Fair",
          widthClass: "w-1/2",
          bgClass: "bg-orange-400",
          textClass: "text-orange-400",
        };
      case 2:
        return {
          label: "Good",
          widthClass: "w-3/4",
          bgClass: "bg-yellow-400",
          textClass: "text-yellow-400",
        };
      case 3:
        return {
          label: "Strong",
          widthClass: "w-full",
          bgClass: "bg-green-500",
          textClass: "text-green-500",
        };
      case 4:
        return {
          label: "Very Strong",
          widthClass: "w-full",
          bgClass: "bg-green-600",
          textClass: "text-green-600",
        };
      default:
        return {
          label: "",
          widthClass: "w-0",
          bgClass: "bg-transparent",
          textClass: "text-transparent",
        };
    }
  }, [score]);

  if (!password) return null;

  return (
    <View className="mt-2 mb-4">
      {/* Background Bar Container */}
      <View className="h-1 w-full bg-zinc-200 rounded-full overflow-hidden">
        {/* Active Filled Bar */}
        <View
          className={`h-full rounded-full ${strengthConfig.widthClass} ${strengthConfig.bgClass}`}
        />
      </View>

      {/* Label Text */}
      <Text
        className={`mt-1 text-xs font-semibold text-right ${strengthConfig.textClass}`}
      >
        {strengthConfig.label}
      </Text>
    </View>
  );
};

export default PasswordStrengthMeter;
