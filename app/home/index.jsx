import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Common";
import { LinearGradient } from "expo-linear-gradient";
import theme from "../../constants/Theme";
import Imagecard from "../../components/Imagecard";
import { Ionicons, Feather } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useLocalSearchParams } from "expo-router";



const HomeScreen = () => {

  const { top} = useSafeAreaInsets();

  const { email} = useLocalSearchParams(); // Access the email query parameter


  const iconClicked = () => {
    Linking.openURL("https://github.com/Althafvc");
  };

  const paddingTop = top > 0 ? top + 10 : 30;
  return (
    <ScrollView
      style={{ backgroundColor: "rgb(48,48,48)" }}
      contentContainerStyle={{
        paddingTop,
        gap: hp(1),
      }}
    >
      {/* Header */}
      <View className="textarea w-full pl-5">
        <Text style={{ color: "white", fontSize: hp(2.5) }}>Hello</Text>
        <Text
          style={{ color: "#FAFAFA", fontSize: hp(2.3) }}
          className="font-bold"
        >
          {email ? email : "Anonymous"}
        </Text>
      </View>

      {/* Gradient Card */}
      <View
        style={{
          width: wp(100),
          marginTop: hp(3),
          height: hp(20),
        }}
        className="moneyboxwrapper flex items-center justify-center"
      >
        <LinearGradient
          colors={["#1B1D29", "#2A2C3A"]}
          className="flex-row"
          style={{
            height: hp(20),
            width: wp(94),
            marginBottom: hp(5),
            borderRadius: theme.radius.md,
            justifyContent: "space-around",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 5,
            elevation: 5,
          }}
        >
          <View
            style={{ width: 100, height: 110 }}
            className="flex justify-center items-center gap-2"
          >
            <Text
              style={{ color: "gold", fontWeight: "bold", fontSize: hp(4) }}
            >
              0
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: hp(3),
                fontWeight: theme.fontWeights.semibold,
              }}
            >
              Points
            </Text>
          </View>
          <View
            style={{ width: 100, height: 110 }}
            className="flex justify-center items-center gap-2"
          >
            <Text
              style={{ color: "gold", fontWeight: "bold", fontSize: hp(4) }}
            >
              0
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: hp(3),
                fontWeight: theme.fontWeights.semibold,
              }}
            >
              Rs
            </Text>
          </View>
        </LinearGradient>
      </View>

      {/* Heading Area */}

      <View
        style={{
          backgroundColor: "white",

          overflow: "hidden",
          borderTopLeftRadius: theme.radius.xl,
          borderTopRightRadius: theme.radius.xl,
        }}
      >
        <View
          style={{
            width: wp(100),
            height: hp(7.5),
            backgroundColor: "white",
            // marginTop: hp(3),
          }}
          className="headArea flex justify-center items-center"
        >
          <Text
            style={{
              fontSize: hp(2.5),
              fontWeight: theme.fontWeights.semibold,
            }}
          >
            Flyer Offers right now
          </Text>
        </View>

        {/* Image Cards */}
        <View
          style={{
            width: wp(100),
            flexDirection: "column",
            alignItems: "center",
            gap: hp(3),
            backgroundColor: "white",
          }}
          className="imagecontainer"
        >
          <Imagecard />
          <Imagecard />
          <Imagecard />
          <Imagecard />
        </View>

        {/* Contact Area */}

        <View
          className="contactwrapper"
          style={{
            width: wp(100),
            height: hp(18),
            gap: 10,
            paddingHorizontal: 17,
            marginTop: hp(4),
          }}
        >
          <Text style={{ fontSize: hp(2.6), fontWeight: "bold" }}>
            If you have any queries please contact us.
          </Text>
          <Text style={{ fontSize: hp(1.8) }}>
            Our service hours are 9:00 a.m to 10:00mp.m if you send us an email
            we will respond within 2-3 business days.
          </Text>
        </View>

        {/* second contact area */}

        <View
          className="contactwrapper2"
          style={{
            width: wp(100),
            height: "auto",
            gap: 15,
            marginTop: hp(4),
          }}
        >
          <View
            style={{
              flexDirection: "row", // Fixed syntax
              width: wp(100),
              height: hp(6),
              alignItems: "center",
              gap: wp(6),
              paddingLeft: wp(5),
            }}
          >
            <View
              style={{
                backgroundColor: "#d3d3d3", // Set your desired background color
                padding: 8, // Padding to make the background larger than the icon
                borderRadius: 50, // Use borderRadius for a circular or rounded shape
                alignItems: "center", // Center the icon horizontally
                justifyContent: "center", // Center the icon vertically
              }}
            >
              <Ionicons name="call" size={20} color="#009505" />
            </View>

            <Text
              style={{
                fontSize: hp(2.3),
              }}
            >
              1234567890
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row", // Fixed syntax
              width: wp(100),
              height: hp(6),
              alignItems: "center",
              gap: wp(6),
              paddingLeft: wp(5),
            }}
          >
            <View
              style={{
                backgroundColor: "#d3d3d3", // Set your desired background color
                padding: 8, // Padding to make the background larger than the icon
                borderRadius: 50, // Use borderRadius for a circular or rounded shape
                alignItems: "center", // Center the icon horizontally
                justifyContent: "center", // Center the icon vertically
              }}
            >
              <Ionicons name="mail" size={20} color="#009505" />
            </View>

            <Text
              style={{
                fontSize: hp(2.3),
              }}
            >
              noori123@gmail.com
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row", // Fixed syntax
              width: wp(100),
              height: hp(7),
              alignItems: "center",
              gap: wp(6),
              paddingLeft: wp(5),
              paddingRight: 4,
            }}
          >
            <View
              style={{
                backgroundColor: "#d3d3d3", // Set your desired background color
                padding: 8, // Padding to make the background larger than the icon
                borderRadius: 50, // Use borderRadius for a circular or rounded shape
                alignItems: "center", // Center the icon horizontally
                justifyContent: "center", // Center the icon vertically
              }}
            >
              <Ionicons name="location" size={20} color="#009505" />
            </View>

            <View className="textwrapper" style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: hp(2),
                  lineHeight: hp(3.5),
                }}
              >
                1234 Elm Street Springfield, IL 62704
              </Text>
            </View>
          </View>

          {/* Social media links */}
          <View
            className="linkwrapper"
            style={{
              width: wp(100),
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: wp(7),
              height: hp(8),
              marginTop: hp(8),
            }}
          >



            <TouchableOpacity onPress={iconClicked} activeOpacity={0.7}>
            <View
              style={{
                backgroundColor: "#009505", // Set your desired background color
                padding: 7, // Padding to make the background larger than the icon
                borderRadius: 50, // Use borderRadius for a circular or rounded shape
                alignItems: "center", // Center the icon horizontally
                justifyContent: "center", // Center the icon vertically
              }}
            >
              <Ionicons name="logo-facebook" size={18} color="white" />
            </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={iconClicked} activeOpacity={0.7}>
            <View
              style={{
                backgroundColor: "#009505", // Set your desired background color
                padding: 7, // Padding to make the background larger than the icon
                borderRadius: 50, // Use borderRadius for a circular or rounded shape
                alignItems: "center", // Center the icon horizontally
                justifyContent: "center", // Center the icon vertically
              }}
            >
              <Ionicons name="logo-instagram" size={18} color="white" />
            </View>
            </TouchableOpacity>



            <TouchableOpacity onPress={iconClicked} activeOpacity={0.7}>
            <View
              style={{
                backgroundColor: "#009505",
                padding: 7,
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="x" size={18} color="white" />
            </View>
            </TouchableOpacity>





            <TouchableOpacity onPress={iconClicked} activeOpacity={0.7}>
              <View
                style={{
                  backgroundColor: "#009505",
                  padding: 7,
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="logo-linkedin" size={18} color="white" />
              </View>
            </TouchableOpacity>
            
          </View>


          {/* Footer area */}

          <View style={{width:wp(100), height:hp(30), marginTop:hp(4)}}>

          <Image
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
        source={require('../../assets/images/footer.jpeg')}
        resizeMode="stretch"
      />

          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
