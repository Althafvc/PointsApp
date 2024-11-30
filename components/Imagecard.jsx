import { View, Image, Text } from 'react-native';
import { hp, wp } from '../helpers/Common';
import React from 'react';
import theme from '../constants/Theme';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome or another icon set


const Imagecard = () => {
  return (
    <View style={{ width: wp(93), height: 200, overflow: 'hidden', borderRadius: theme.radius.sm }}>
      {/* Background Image */}
      <Image
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
        source={require('../assets/images/offer.jpg')}
        resizeMode="cover"
      />

      {/* Black and White Overlay at the Bottom */}
      <View
  style={{
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems:'center',
    paddingLeft:20, 
    flexDirection:'row',
    gap:wp(8)
  }}
>

<FontAwesome name="calendar" size={20} color="white" />
<Text style={{color:'white', fontSize:hp(2), fontWeight:theme.fontWeights.semibold}}>Expires in 7 days</Text>

</View>

    </View>
  );
};

export default Imagecard;

