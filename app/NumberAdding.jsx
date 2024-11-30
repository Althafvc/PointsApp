import React, { useReducer, useState } from "react";
import { View, Text, Pressable, Image, TextInput } from "react-native";
import { hp, wp } from "../helpers/Common";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import api from "../Api";
import Toast from 'react-native-toast-message';
import theme from '../constants/Theme'
import { useForm, Controller } from "react-hook-form"; // Import useForm and Controller

const NumberScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  
  const router = useRouter();
  
  const showToast = (message) => {
    Toast.show({
      type: 'success',
      text1: message,
      position: 'top'
    });
  }
  
  const toastConfig = {
    success: ({text1, props, ...rest}) => {
      return (
        <View style={{padding:27, paddingHorizontal:30, borderRadius:theme.radius.xl, justifyContent:'center', alignItems:'center', backgroundColor:'white'}}>
          <Text style={{fontSize:hp(1.8), fontWeight:theme.fontWeights.semibold, color:'gray'}}>{text1}</Text>
        </View>
      );
    }
  }

  const onSubmit = async (data) => {
    
    const email = data.email;
    const phone = data.phone


    try {
      
      const response = await api.post(`/verifyemail`, { data });
      
      if (response.data.success) {
        showToast(response.data.message);

      
        setTimeout(() => {
          router.push(`/OTP?email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`);
        }, 1500);

      } else {
        alert(response.data.message || 'Error occurred in phone verification');
      }
    } catch (err) {
      console.log('Error details:', err);      
      alert(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <View className="flex-1 bg-[rgba(25,27,39,1)]">
      <Toast config={toastConfig} visibilityTime={1500} />
      <View className="w-full flex justify-center items-center" style={{ height: hp(60) }}>
        <Image source={require("../assets/images/noori.png")} resizeMode="center" />
      </View>

      <View className="flex absolute bottom-0 bg-white rounded-t-2xl px-4" style={{ height: hp(45.9), width: wp(100), gap: hp(1.8) }}>
        <View className="iconArea w-full flex justify-center" style={{ height: hp(4), marginTop: hp(1) }}>
          <Ionicons onPress={() => router.back()} name="arrow-back" size={22} color="black" />
        </View>
        <View className="flex justify-center gap-3" style={{ marginTop: hp(1) }}>
          <Animated.Text entering={FadeInDown.delay(300).springify()} className="text-[#161616] font-bold" style={{ fontSize: hp(2.5), letterSpacing: 0.5 }}>
            Get started with Pointsapp
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(400).springify()} className="text-[#484848]" style={{ fontSize: hp(1.8), letterSpacing: 1}}>
            Enter your Email and phone number
          </Animated.Text>
        </View>






        {/* Phone Number Input with react-hook-form */}
        <Animated.View entering={FadeInDown.delay(500).springify()} className="mt-4 border rounded-lg overflow-hidden" style={{ borderColor: "rgb(215,215,215)", borderWidth: 1 }}>
          <Controller
            control={control}
            name="phone"
            rules={{
              required: "phone is required",
              pattern: {
                value: /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
                message: 'Invalid phone format'
              }
          
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="bg-gray-100 text-black pl-5"
                placeholder="Enter your phone number"
                onChangeText={onChange}
                value={value}
                keyboardType="number-pad"
                maxLength={10}
                style={{
                  height: hp(6),
                  fontSize: hp(2),
                }}
              />
            )}
          />
          {/* Display error if phone number validation fails */}
        </Animated.View>
          {errors.phone && <Text style={{ color: "red" }}>{errors.phone.message}</Text>}







{/* Phone Number Input with react-hook-form */}
<Animated.View entering={FadeInDown.delay(500).springify()} className="mt-4 border rounded-lg overflow-hidden" style={{ borderColor: "rgb(215,215,215)", borderWidth: 1 }}>
        <Controller
            control={control}
            name="email"
            rules={{
              required: "email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email adress',
              }
              
          
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="bg-gray-100 text-black pl-5"
                placeholder="Enter your email adress"
                onChangeText={onChange}
                value={value}
                style={{
                  height: hp(6),
                  fontSize: hp(2),
                }}
              />
            )}
          />
          {/* Display error if phone number validation fails */}
        </Animated.View>
          {errors.email && <Text style={{ color: "red" }}>{errors.email.message}</Text>}



        {/* Button */}
        <Animated.View entering={FadeInDown.delay(600).springify()} className="w-full flex justify-center items-center" style={{ height: hp(7), marginBottom:hp(6)}}>
          <Pressable onPress={handleSubmit(onSubmit)} className="w-full flex justify-center items-center rounded-md" style={{ backgroundColor: "rgb(39,160,45)", height: hp(6.5) }}>
            <Text className="text-white font-bold" style={{ fontSize: hp(2.3) }}>
              Continue
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
};

export default NumberScreen;
