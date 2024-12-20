import React, {useState } from 'react';
import { View, Text, Pressable, Image,} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { hp, wp } from '../helpers/Common';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from "react-native-reanimated";


const Index = () => {
  const [selectedValue, setSelectedvalue] = useState('Select');
  const router = useRouter()

  function handleSubmit () {
    
    if(selectedValue && selectedValue != 'Select') {
      router.push('NumberAdding')

    } else {
      alert('Plese select your language')
    }
  }

  return (
    <View className="flex-1 bg-[rgba(25,27,39,1)]">
      <View className='w-full flex justify-center items-center' style={{height:hp(60)}}>
        <Image source={require('../assets/images/noori.png')}  resizeMode="center"/>
      </View>
      <View
        className=" flex absolute bottom-0 bg-white rounded-t-2xl px-4"
        style={{ height: hp(40), width: wp(100), gap:hp(3)}}
      >
        {/* Text Section */}
        <View className="flex justify-center gap-4" style={{marginTop:hp(2)}}>
          <Animated.Text entering={FadeInDown.delay(300).springify()} className="text-[#161616] font-bold" style={{ fontSize: hp(3.2), letterSpacing:0.5}}>
            Select your language
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(400).springify()} className="text-[#484848]" style={{ fontSize: hp(2), letterSpacing:1}}>
            We would love to deliver an experience in your preferred language.
          </Animated.Text>
        </View>

        {/* Dropdown */}
        <Animated.View entering={FadeInDown.delay(500).springify()}
          className="mt-4 border rounded-lg overflow-hidden"
          style={{ borderColor: 'rgb(215,215,215)', borderWidth: 1, width:wp(90) }}
        >
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => setSelectedvalue(itemValue)}
            className="bg-gray-100 text-red-60"
            style={{ height: hp(6) }}
            dropdownIconColor="gray"
          >
            <Picker.Item label="Select" value="Select" />
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Arabic" value="Arabic" />
          </Picker>
        </Animated.View>

        {/* Button */}

        <Animated.View entering={FadeInDown.delay(600).springify()}
        className='w-full flex justify-center items-center' style={{height:hp(7)}}>
          <Pressable onPress={handleSubmit} className='w-full flex justify-center items-center rounded-md' style={{backgroundColor:'rgb(39,160,45)', height:hp(6.5), width:wp(90) }}>
          <Text className="text-white font-bold" style={{fontSize:hp(2.3)}}>Continue</Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
};

export default Index;
