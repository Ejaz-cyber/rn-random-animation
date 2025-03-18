// import { useNavigation } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View, Text, Button } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

function Profile() {
  const router = useRouter();
  const navigation = useNavigation();
  const handlePress = () => {
    // router.push("/")
    navigation.goBack();
  };

  return (
    <>
      <Animated.Text style={{ fontSize: 44 }} sharedTransitionTag="tag">
        Profile Screen
      </Animated.Text>
      <Animated.View
        sharedTransitionTag="box"
        style={{ height: 100, width: 40, backgroundColor: "red" }}
      ></Animated.View>
      <Button onPress={handlePress} title="press me" />
    </>
  );
}

export default Profile;
