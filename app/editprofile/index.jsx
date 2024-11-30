import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Common";
import theme from "../../constants/Theme";
import api from "../../Api";
import { Ionicons } from "@expo/vector-icons";
import Animated, {FadeInDown } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";


const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const [nameFocused, setNameFocused] = useState(false);
  const [DOBFocused, setDOBFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [nationalityFocused, setNationalityFocused] = useState(false);
  const [cityFocused, setCityFocused] = useState(false);
  const [pincodeFocused, setPincodeFocused] = useState(false);
  const [gender, setGender] = useState("");
  const [DOB, setDOB] = useState(""); // Local state for DOB input
  const [user, setUser] = useState(null)


  const { email} = useLocalSearchParams(); // Access the email query parameter



  const [formData, setFormData] = useState({}); // State to hold form data

const handleInputChange = (field, value) => {
  setFormData((prev) => ({
    ...prev,
    [field]: value, // Dynamically update the field in the formData object
  }));
};


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDOBChange = (text) => {
    // Remove non-numeric characters
    let formattedText = text.replace(/[^0-9]/g, "");

    // Add separators after day and month
    if (formattedText.length >= 3) {
      formattedText = `${formattedText.slice(0, 2)}/${formattedText.slice(2)}`;
    }
    if (formattedText.length >= 6) {
      formattedText = `${formattedText.slice(0, 5)}/${formattedText.slice(5)}`;
    }

    setDOB(formattedText); // Update local state
  };

  
 

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
    handleInputChange("gender", selectedGender); // Update the formData object
  };



  const paddingTop = top > 0 ? top + 10 : 20;

  const showToast = (message) => {
    Toast.show({
      type: "success",
      text1: message,
      position: "bottom",
    });
  };

  const toastConfig = {
    success: ({ text1, props, ...rest }) => {
      return (
        <View
          style={{
            padding: 15,
            paddingHorizontal: 30,
            borderRadius: theme.radius.xl,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "orang",
          }}
        >
          <Text
            style={{
              fontSize: hp(1.8),
              fontWeight: theme.fontWeights.semibold,
              color: "white",
            }}
          >
            {text1}
          </Text>
        </View>
      );
    },
  };

  const onSubmit = async (data) => {
    data.gender = gender;

    try {

      data.email = email
      
      const response = await api.post("/user/profile", data);

      if(response.data.success) {
        
        setTimeout(() => {
            router.back()
        }, 800);
      }
    } catch (err) {
      showToast(err.response.data.message || "profile editing failed");
      console.log(err);
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      contentContainerStyle={{
        paddingTop,
        flexGrow: 1,
      }}
    >
      {/* icon area */}
      <Animated.View
        entering={FadeInDown.delay(100).springify()}
        style={{
          width: wp(100),
          height: hp(6),
          justifyContent: "center",
          paddingLeft: wp(4.5),
        }}
      >
        <Ionicons onPress={()=> router.back()} name="arrow-back-outline" size={28} color="#333333" />
      </Animated.View>

      {/* Head Area */}

      <Animated.View
        entering={FadeInDown.delay(200).springify()}
        style={{
          width: wp(100),
          height: hp(6),
          justifyContent: "center",
          paddingLeft: wp(4.5),
        }}
      >
        <Text
          style={{
            color: "#333333",
            fontSize: hp(3),
            fontWeight: theme.fontWeights.bold,
          }}
        >
          Edit Profile
        </Text>
      </Animated.View>

      {/* Content area */}

      <View style={{ width: wp(100), height: "auto", gap: hp(2.5) }}>
        <Animated.View
          entering={FadeInDown.delay(300).springify()}
          className="inputLayout"
          style={{
            width: wp(100),
            gap: 9,
            height: hp(10),
            paddingLeft: wp(4.5),
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: hp(2), color: "gray", letterSpacing: 1.2 }}>
            Your Name
          </Text>

          <Controller
            control={control}
            name="name"
            rules={{
              required: "Name is required", // Validation rule for required field
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{
                  width: "90%",
                  borderWidth: nameFocused ? 2 : 1,
                  borderColor: nameFocused ? "#27a02d" : "gray", // Change border color based on focus state
                  height: hp(5),
                  paddingLeft: 12,
                  fontSize: hp(2),
                  borderRadius: 5,
                }}
                placeholder="Enter Your Name"
                value={value} // Use value from Controller
                onChangeText={onChange} // Use onChange from Controller
                onFocus={() => setNameFocused(true)} // Set focus state to true when focused
                onBlur={() => {
                  setNameFocused(false); // Set focus state to false when blurred
                  onBlur(); // Trigger React Hook Form's onBlur
                }}
              />
            )}
          />
          {errors.name && (
            <Text style={{ color: "red", fontSize: hp(1.5),}}>
              {errors.name.message}
            </Text>
          )}
        </Animated.View>



        <Animated.View
      entering={FadeInDown.delay(500).springify()}
      className="inputLayout"
      style={{
        width: wp(100),
        gap: 9,
        height: hp(10),
        paddingLeft: wp(4.5),
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: hp(2), color: "gray", letterSpacing: 1.2 }}>
        Date of Birth
      </Text>

      <Controller
        control={control}
        name="DOB"
        rules={{
          required: "Date of Birth is required",
          pattern: {
            value: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
            message: "Enter a valid date in DD/MM/YYYY format",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{
              width: "90%",
              borderWidth: DOBFocused ? 2 : 1,
              borderColor: errors.DOB ? "red" : DOBFocused ? "#27a02d" : "gray",
              height: hp(5),
              paddingLeft: 12,
              fontSize: hp(2),
              borderRadius: 5,
            }}
            placeholder="DD/MM/YYYY"
            value={DOB} // Use local state for DOB
            keyboardType="numeric"
            maxLength={10}
            onChangeText={(text) => {
              handleDOBChange(text);
              onChange(text); // Pass the text change to React Hook Form
            }}
            onFocus={() => setDOBFocused(true)}
            onBlur={() => {
              setDOBFocused(false);
              onBlur(); // Pass blur event to React Hook Form
            }}
          />
        )}
      />

      {errors.DOB && (
        <Text style={{ color: "red", fontSize: hp(1.5), marginTop: 4 }}>
          {errors.DOB.message}
        </Text>
      )}
    </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(600).springify()}
          style={{
            width: wp(100),
            height: hp(10),
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Pressable
            onPress={() => handleGenderChange("male")}
            style={{
              width: "25%",
              height: "60%",
              borderWidth: 1,
              borderRightWidth: 0,
              borderTopLeftRadius: 6,
              borderBottomLeftRadius: 6,
              borderColor: "gray",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: gender === "male" ? "#27a128" : "white",
            }}
          >
            <Text
              style={{
                fontSize: hp(2),
                color: gender == "male" ? "white" : "gray",
                fontWeight:
                  gender == "male" ? theme.fontWeights.semibold : "normal",
              }}
            >
              Male
            </Text>
          </Pressable>

          <Pressable
            onPress={() => handleGenderChange("female")}
            style={{
              width: "25%",
              height: "60%",
              borderWidth: 1,
              borderColor: "gray",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: gender === "female" ? "#27a128" : "white",
            }}
          >
            <Text
              style={{
                fontSize: hp(2),
                color: gender == "female" ? "white" : "gray",
                fontWeight:
                  gender == "female" ? theme.fontWeights.semibold : "normal",
              }}
            >
              Female
            </Text>
          </Pressable>

          <Pressable
            onPress={() => handleGenderChange("other")}
            style={{
              width: "25%",
              borderBottomRightRadius: 6,
              borderTopRightRadius: 6,
              height: "60%",
              borderWidth: 1,
              borderColor: "gray",
              borderLeftWidth: 0,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: gender === "other" ? "#27a128" : "white",
            }}
          >
            <Text
              style={{
                fontSize: hp(2),
                color: gender == "other" ? "white" : "gray",
                fontWeight:
                  gender == "other" ? theme.fontWeights.semibold : "normal",
              }}
            >
              Other
            </Text>
          </Pressable>
        </Animated.View>

        <Animated.View
      entering={FadeInDown.delay(700).springify()}
      className="inputLayout"
      style={{
        width: wp(100),
        gap: 9,
        height: hp(10),
        paddingLeft: wp(4.5),
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: hp(2), color: "gray", letterSpacing: 1.2 }}>
        Your Phone
      </Text>

      <Controller
        control={control}
        name="phone"
        rules={{
          required: "Phone number is required", // Validation rule for required field
          minLength: {
            value: 10,
            message: "Phone number must be 10 digits",
          },
          maxLength: {
            value: 10,
            message: "Phone number must be 10 digits",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{
              width: "90%",
              borderWidth: phoneFocused ? 2 : 1,
              borderColor: phoneFocused ? "#27a02d" : "gray", // Change border color based on focus state
              height: hp(5),
              paddingLeft: 12,
              fontSize: hp(2),
              borderRadius: 5,
            }}
          
            placeholder={user? user.phone :'Enter your phone'}
            maxLength={10}
            value={value} // Use value from Controller
            onChangeText={onChange} // Use onChange from Controller
            keyboardType="numeric" // Restrict input to numbers
            onFocus={() => setPhoneFocused(true)} // Set focus state to true when focused
            onBlur={() => {
              setPhoneFocused(false); // Set focus state to false when blurred
              onBlur(); // Trigger React Hook Form's onBlur
            }}
          />
        )}
      />

      {errors.phone && (
        <Text style={{ color: "red", fontSize: hp(1.5), marginTop: 4 }}>
          {errors.phone.message}
        </Text>
      )}
    </Animated.View>

    <Animated.View
      entering={FadeInDown.delay(800).springify()}
      className="inputLayout"
      style={{
        width: wp(100),
        gap: 9,
        height: hp(10),
        paddingLeft: wp(4.5),
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: hp(2), color: "gray", letterSpacing: 1.2 }}>
        Nationality
      </Text>

      <Controller
        control={control}
        name="nationality"
        rules={{
          required: "Nationality is required", // Validation rule for required field
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{
              width: "90%",
              borderWidth: nationalityFocused ? 2 : 1,
              borderColor: nationalityFocused ? "#27a02d" : "gray", // Change border color based on focus state
              height: hp(5),
              paddingLeft: 12,
              fontSize: hp(2),
              borderRadius: 5,
            }}
            placeholder="Enter Your Nationality"
            value={value} // Use value from Controller
            onChangeText={onChange} // Use onChange from Controller
            onFocus={() => setNationalityFocused(true)} // Set focus state to true when focused
            onBlur={() => {
              setNationalityFocused(false); // Set focus state to false when blurred
              onBlur(); // Trigger React Hook Form's onBlur
            }}
          />
        )}
      />

      {errors.nationality && (
        <Text style={{ color: "red", fontSize: hp(1.5), marginTop: 4 }}>
          {errors.nationality.message}
        </Text>
      )}
    </Animated.View>

    <Animated.View
      entering={FadeInDown.delay(900).springify()}
      className="inputLayout"
      style={{
        width: wp(100),
        gap: 9,
        height: hp(10),
        paddingLeft: wp(4.5),
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: hp(2), color: "gray", letterSpacing: 1.2 }}>
        City
      </Text>

      <Controller
        control={control}
        name="city"
        rules={{
          required: "City is required", // Validation rule for required field
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{
              width: "90%",
              borderWidth: cityFocused ? 2 : 1,
              borderColor: cityFocused ? "#27a02d" : "gray", // Change border color based on focus state
              height: hp(5),
              paddingLeft: 12,
              fontSize: hp(2),
              borderRadius: 5,
            }}
            placeholder="Enter City"
            value={value} // Use value from Controller
            onChangeText={onChange} // Use onChange from Controller
            onFocus={() => setCityFocused(true)} // Set focus state to true when focused
            onBlur={() => {
              setCityFocused(false); // Set focus state to false when blurred
              onBlur(); // Trigger React Hook Form's onBlur
            }}
          />
        )}
      />

      {errors.city && (
        <Text style={{ color: "red", fontSize: hp(1.5), marginTop: 4 }}>
          {errors.city.message}
        </Text>
      )}
    </Animated.View>

    <Animated.View
      entering={FadeInDown.delay(1000).springify()}
      className="inputLayout"
      style={{
        width: wp(100),
        gap: 9,
        height: hp(10),
        paddingLeft: wp(4.5),
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: hp(2), color: "gray", letterSpacing: 1.2 }}>
        Pincode
      </Text>

      <Controller
        control={control}
        name="pincode"
        rules={{
          required: "Pincode is required", // Validation rule for required field
          minLength: {
            value: 6,
            message: "Pincode must be 6 digits",
          },
          maxLength: {
            value: 6,
            message: "Pincode must be 6 digits",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{
              width: "90%",
              borderWidth: pincodeFocused ? 2 : 1,
              borderColor: pincodeFocused ? "#27a02d" : "gray", // Change border color based on focus state
              height: hp(5),
              paddingLeft: 12,
              fontSize: hp(2),
              borderRadius: 5,
            }}
            placeholder="Enter Your Pincode"
            value={value} // Use value from Controller
            onChangeText={onChange} // Use onChange from Controller
            keyboardType="numeric" // Restrict input to numbers
            maxLength={6}
            onFocus={() => setPincodeFocused(true)} // Set focus state to true when focused
            onBlur={() => {
              setPincodeFocused(false); // Set focus state to false when blurred
              onBlur(); // Trigger React Hook Form's onBlur
            }}
          />
        )}
      />

      {errors.pincode && (
        <Text style={{ color: "red", fontSize: hp(1.5), marginTop: 4 }}>
          {errors.pincode.message}
        </Text>
      )}
    </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(1100).springify()}
          style={{
            width: wp(100),
            height: hp(8),
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Pressable
            onPress={handleSubmit(onSubmit)}
            style={{
              width: "70%",
              height: "70%",
              borderRadius: 6,
              backgroundColor: "#27a128",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: hp(2.5),
                color: "white",
                fontWeight: theme.fontWeights.semibold,
              }}
            >
              Save
            </Text>
          </Pressable>
        </Animated.View>
      </View>
      <Toast config={toastConfig} />
    </ScrollView>
  );
};

export default HomeScreen;
