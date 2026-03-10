
import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { recoverPassword } from "@/lib/appwrite";
import { CustomButton, CustomInput } from "@/components";
import { color } from "@/constants";

const COOLDOWN_SECONDS = 60;

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState('')

  const startCooldown = () => {
    setCooldown(COOLDOWN_SECONDS);

    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const getPassword = async () => {
    try {
        setError('')
      if (!email) {
        throw new Error("Please provide a valid email");
        return;
      }

      if (cooldown > 0) {
        throw new Error(
          `Please wait, You can request another reset in ${cooldown}s`
        );
        return;
      }

      setIsLoading(true);

      const result = await recoverPassword(email);

      if (!result.success) {
        
        throw new Error(result.message);
      }
      
      startCooldown();

      Alert.alert(
        "Password Reset",
        "If the email exists, a recovery link has been sent."
      );
    } catch (e: any) {
      setError(e.message || "Error recovering password")
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      className="gap-8 px-6 items-center h-full justify-center"
      style={{ backgroundColor: color.morange }}
    >
      <Text className="mb-4 font-bold text-xl">Reset your password</Text>
    <View className="items-center">
       <CustomInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Enter your email"
      />
      {error && <Text className="text-red-700 mt-3">{error}</Text>}
    </View>
     
      <CustomButton
        onPress={getPassword}
        isLoading={isLoading}
        title={
          cooldown > 0
            ? `Try again in ${cooldown}s`
            : "Click to reset password"
        }
        style={"bg-blue-300"}
      />
    </View>
  );
};

export default ResetPassword;