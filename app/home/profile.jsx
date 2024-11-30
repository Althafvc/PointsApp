import { View, Text, ScrollView, Pressable  } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Common";
import theme from "../../constants/Theme";
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useNavigation } from 'expo-router';
import api from "../../Api";
import Animated, {FadeIn, FadeInDown } from "react-native-reanimated";





const ProfileScreen = () => {
  const { top} = useSafeAreaInsets();
  const router = useRouter()
  const { email } = useNavigation().getState().routes[0].params;
  const [user, setUser] = useState(null)
  

useEffect(()=> {

  const fetchUser = async () => {
    try {
      const response = await api.post('/user/fetchuser',{email});

      if(response.data.user) {
          setUser(response.data.user)
          
      }
      
    } catch (err) {
      console.error('User data fetching failed:', err.message || err);
    }
  };
  fetchUser()

},[])



  const paddingTop = top > 0 ? top + 10 : 30;


  return (
    <ScrollView
      style={{ backgroundColor: "rgba(25,27,39,255)" }}
      contentContainerStyle={{
        paddingTop,
        gap: hp(1),
        flexGrow:1
      }}
    >
      {/* Header */}

      <View
        style={{
          width: wp(100),
          height: hp(6),
          paddingLeft: wp(4),
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: hp(3),
            fontWeight: theme.fontWeights.bold,
          }}
        >
          Noori supermarkets
        </Text>
      </View>

      {/* Profile area */}

  <View
  style={{
    width: wp(100),
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(8),
   // Push it down by a margin
  }}
>
  <View
    style={{
      width: wp(30),
      height: wp(30),
      borderRadius: wp(15),
      borderWidth: 4,
      borderColor: "white",
      backgroundColor: "#d4a55d",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text style={{ fontSize: hp(5), color: "white" }}>?</Text>
  </View>
</View>


{/* details Area */}



      <View
        style={{
          width: wp(100),
          backgroundColor: "white",
          height: 'auto',
          marginTop: hp(3),
        }}
      >

        <View style={{width:wp(100),  height:hp(9), marginTop:hp(8), justifyContent:'center', alignItems:'center', gap:hp(1)}}>

          <Text style={{fontWeight:theme.fontWeights.bold, fontSize:hp(2.5)}}>{email}</Text>
          <Text style={{fontSize:hp(1.8), letterSpacing:1.5}}>{user ? user.phone : null}</Text>

        </View>

        <Animated.View entering={FadeInDown.delay(200).springify()} style={{width:wp(100), height:hp(5), justifyContent:'center', alignItems:'center'}}>
            <Pressable onPress={() => router.push(`editprofile?email=${encodeURIComponent(email)}`)}
             style={{width:wp(35), height:hp(3.7), borderWidth:1, flexDirection:'row', borderColor:'gray', gap:14, borderRadius:5, justifyContent:'center', alignItems:'center'}}>
            <Feather name="edit-3" size={18} color="black" />
            <Text style={{fontSize:hp(2), fontWeight:theme.fontWeights.semibold}}>Edit profile</Text>
            </Pressable>
        </Animated.View>

        {/* Bars area */}

        <View style={{width:wp(100), height:'auto', marginTop:hp(4),}}>



          <Animated.View entering={FadeInDown.delay(300).springify()} style={{width:wp(100), height:hp(6), borderBottomColor:'#A9A9A9', borderBottomWidth:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:wp(2.5)}}>
            <View style={{width:wp(50), height:'100%', gap:10, flexDirection:'row',  alignItems:'center'}}  className='contentarea'>
            <Ionicons name="star-outline" size={20} color="gray" />
            <Text style={{letterSpacing:1, color:'gray'}}>About PointsApp</Text>
            </View>
            <View style={{width:wp(30), height:'100%', flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}} className='iconarea'>
            <Ionicons name="chevron-forward" size={20} color="gray" />
            </View>
          </Animated.View>





          <Animated.View  entering={FadeInDown.delay(400).springify()}  style={{width:wp(100), height:hp(6), borderBottomColor:'#A9A9A9', borderBottomWidth:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:wp(2.5)}}>
            <View style={{width:wp(50), height:'100%', gap:10, flexDirection:'row',  alignItems:'center'}}  className='contentarea'>
            <Ionicons name="bag-outline" size={20} color="gray" />
            <Text style={{letterSpacing:1, color:'gray'}}>Noori stores  </Text>
            </View>
            <View style={{width:wp(30), height:'100%', flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}} className='iconarea'>
            <Ionicons name="chevron-forward" size={20} color="gray" />
            </View>
          </Animated.View>


          <Animated.View  entering={FadeInDown.delay(500).springify()} style={{width:wp(100), height:hp(6), borderBottomColor:'#A9A9A9', borderBottomWidth:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:wp(2.5)}}>
            <View style={{width:wp(50), height:'100%', gap:10, flexDirection:'row',  alignItems:'center'}}  className='contentarea'>
            <Ionicons name="chatbubble-outline" size={20} color="gray" />
            <Text style={{letterSpacing:1, color:'gray'}}>FAQs</Text>
            </View>
            <View style={{width:wp(30), height:'100%', flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}} className='iconarea'>
            <Ionicons name="chevron-forward" size={20} color="gray" />
            </View>
          </Animated.View>



          <Animated.View entering={FadeInDown.delay(600).springify()} style={{width:wp(100), height:hp(6), borderBottomColor:'#A9A9A9', borderBottomWidth:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:wp(2.5)}}>
            <View style={{width:wp(50), height:'100%', gap:10, flexDirection:'row',  alignItems:'center'}}  className='contentarea'>
            <Ionicons name="mail-outline" size={20} color="gray" />
            <Text style={{letterSpacing:1, color:'gray'}}>Contact Us</Text>
            </View>
            <View style={{width:wp(30), height:'100%', flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}} className='iconarea'>
            <Ionicons name="chevron-forward" size={20} color="gray" />
            </View>
          </Animated.View>



          <Animated.View entering={FadeInDown.delay(700).springify()} style={{width:wp(100), height:hp(6), borderBottomColor:'#A9A9A9', borderBottomWidth:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:wp(2.5)}}>
            <View style={{width:wp(50), height:'100%', gap:10, flexDirection:'row',  alignItems:'center'}}  className='contentarea'>
            <Ionicons name="create-outline" size={20} color="gray" />
            <Text style={{letterSpacing:1, color:'gray'}}>App Feedback</Text>
            </View>
            <View style={{width:wp(30), height:'100%', flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}} className='iconarea'>
            <Ionicons name="chevron-forward" size={20} color="gray" />
            </View>
          </Animated.View>




          <Animated.View entering={FadeInDown.delay(800).springify()} style={{width:wp(100), height:hp(6), borderBottomColor:'#A9A9A9', borderBottomWidth:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:wp(2.5)}}>
            <View style={{width:wp(50), height:'100%', gap:10, flexDirection:'row',  alignItems:'center'}}  className='contentarea'>
            <Ionicons name="star-outline" size={20} color="gray" />
            <Text style={{letterSpacing:1, color:'gray'}}>Rate Us</Text>
            </View>
            <View style={{width:wp(30), height:'100%', flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}} className='iconarea'>
            <Ionicons name="chevron-forward" size={20} color="gray" />
            </View>
          </Animated.View>



          <Animated.View entering={FadeInDown.delay(900).springify()} style={{width:wp(100), height:hp(6), borderBottomColor:'#A9A9A9', borderBottomWidth:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:wp(2.5)}}>
            <View style={{width:wp(50), height:'100%', gap:10, flexDirection:'row',  alignItems:'center'}}  className='contentarea'>
            <Ionicons name="refresh" size={20} color="gray" />
            <Text style={{letterSpacing:1, color:'gray'}}>Check For Updates</Text>
            </View>
            <View style={{width:wp(30), height:'100%', flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}} className='iconarea'>
            <Ionicons name="chevron-forward" size={20} color="gray" />
            </View>
          </Animated.View>



          <Animated.View entering={FadeInDown.delay(1000).springify()} style={{width:wp(100), height:hp(6), borderBottomColor:'#A9A9A9', borderBottomWidth:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:wp(2.5)}}>
            <View style={{width:wp(50), height:'100%', gap:10, flexDirection:'row',  alignItems:'center'}}  className='contentarea'>
            <Ionicons name="trash-outline" size={20} color="gray" />
            <Text style={{letterSpacing:1, color:'gray'}}>Delete Account</Text>
            </View>
            <View style={{width:wp(30), height:'100%', flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}} className='iconarea'>
            <Ionicons name="chevron-forward" size={20} color="gray" />
            </View>
          </Animated.View>

        </View>
       
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
