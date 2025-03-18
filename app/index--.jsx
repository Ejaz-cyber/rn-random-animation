// import { useNavigation } from "@react-navigation/native";
import { router, useNavigation } from "expo-router";
import React from "react";
import { Button, Text } from "react-native";
import Animated from "react-native-reanimated";

export default function MainScreen() {

    const navigation = useNavigation()
    const handlePress = () => {
        // router.push("/Profile")
        navigation.navigate("Profile")
    }

  return (
    <>
      <Animated.Text sharedTransitionTag="tag">Main Screen (index page)</Animated.Text>
      <Animated.View sharedTransitionTag="box" style={{height: 50, width: 40, backgroundColor: "red"}}></Animated.View>
      <Button onPress={handlePress} title="press me" />
    </>
  );
}
