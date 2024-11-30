import { View, Text, Image, TextInput, Pressable } from "react-native";
import React, { useState, useRef } from "react";
import { hp, wp } from "../helpers/Common";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import Toast from 'react-native-toast-message';
import theme from '../constants/Theme'
import api from "../Api";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";





const OTP = () => {
  const { email, phone } = useLocalSearchParams(); // Access the email query parameter
  
  const [otpCode, setOtpCode] = useState(['', '', '', '']); // State to hold OTP digits

  const router = useRouter();

  let finalOTP = []

  // Create individual focus states for each input field
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const [isFocused4, setIsFocused4] = useState(false);

  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);

  const handleChange = (index, text) => {
    const updatedOtpCode = [...otpCode];
    updatedOtpCode[index] = text; // Update the OTP value for the corresponding index
    setOtpCode(updatedOtpCode);
  };

  const checkOtpFilled = () => {
    // Check if all OTP fields are filled
    if (otpCode.some(digit => digit === '')) {
      showToast('Please fill in all OTP fields');
      return false;
    }
    return true;
  };

  const showToast = (message) => {
    Toast.show({
      type: 'success',
      text1: message,
      position: 'top'
    });
  };

  const toastConfig = {
    success: ({ text1, props, ...rest }) => {
      return (
        <View
         style={{ padding: 27, paddingHorizontal: 30, borderRadius: theme.radius.xl, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
          <Text style={{ fontSize: hp(1.8), fontWeight: theme.fontWeights.semibold, color: 'gray' }}>{text1}</Text>
        </View>
      );
    }
  };


  const handleSubmit = async () => {


    if (checkOtpFilled()) {    

      try {
        
        const response = await api.post('/postotp',{otpCode,email, phone})
        if(response.data.success) {
          router.push(`home?email=${encodeURIComponent(email)}`)

        } else {
          showToast(response.data.message || 'Invalid OTP')
        }
      }catch(err) {

        showToast(err.response.data.message)
      }
      
    }
  }
  return (
    <View className="flex-1 bg-[rgba(25,27,39,1)]">
      <Toast config={toastConfig} visibilityTime={1500} />
      <View className="w-full flex justify-center items-center" style={{ height: hp(60) }}>
        <Image source={require("../assets/images/noori.png")} resizeMode="center" />
      </View>

      <View className="flex absolute bottom-0 bg-white rounded-t-2xl px-4" style={{ height: hp(40), width: wp(100), }}>
        {/* Icon Area */}
        <Animated.View entering={FadeInDown.delay(200).springify()}
         className="iconArea w-full flex justify-center" style={{ height: hp(4), marginTop: hp(1) }}>
          <Ionicons onPress={() => router.back()} name="arrow-back" size={24} color="black" />
        </Animated.View>

        {/* Text Section */}
        <Animated.View entering={FadeInDown.delay(300).springify()}
        className="flex justify-center gap-4">
          <Text className="text-[#161616] font-bold" style={{ fontSize: hp(3), letterSpacing: 0.5 }}>
            OTP verification
          </Text>
          <Text className="text-[#484848]" style={{ fontSize: hp(2.2), letterSpacing: 1 }}>
            We have sent OTP to: {email}
          </Text>
        </Animated.View>

        {/* OTP Input Fields */}
        <Animated.View entering={FadeInDown.delay(400).springify()}
         className="flex-row justify-center items-center gap-8" style={{ height: hp(6), width: wp(90), marginTop:hp(3) }}>
          {otpCode.map((digit, index) => (
            <TextInput
              key={index}
              ref={[input1Ref, input2Ref, input3Ref, input4Ref][index]}
              style={{
                width: wp(12),
                height: hp(5),
                borderWidth: 1,
                borderColor: [isFocused1, isFocused2, isFocused3, isFocused4][index] ? "blue" : "gray",
                borderRadius: 6,
                fontSize: hp(3),
                textAlign: "center",
              }}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onFocus={() => {
                [setIsFocused1, setIsFocused2, setIsFocused3, setIsFocused4][index](true);
              }}
              onBlur={() => {
                [setIsFocused1, setIsFocused2, setIsFocused3, setIsFocused4][index](false);
              }}
              onChangeText={(text) => {
                handleChange(index, text); // Update OTP value on text change
                if (text.length === 1 && index < 3) {
                  [input1Ref, input2Ref, input3Ref, input4Ref][index + 1]?.current?.focus(); // Move to next input if text is entered
                }
              }}
            />
          ))}
        </Animated.View>

        {/* Button */}
        <Animated.View entering={FadeInDown.delay(500).springify()}
         className="w-full flex justify-center items-center" style={{ height: hp(7), marginTop:hp(4)}}>
          <Pressable
            onPress={handleSubmit}
            className="w-full flex justify-center items-center rounded-md"
            style={{ backgroundColor: "rgb(39,160,45)", height: hp(6.5) }}
          >
            <Text className="text-white font-bold" style={{ fontSize: hp(2.3) }}>
              Continue
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
};

export default OTP;
