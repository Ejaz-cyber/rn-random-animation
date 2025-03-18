import { Image, StyleSheet, Platform, Button } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const handlePress = (navId) => {
    // router.push("Profile")

    console.log(navId);
    switch (navId) {
      case 1:
        router.push("screens/Animation1");
        break;
      case 2:
        router.push("screens/Animation2");
        break;
      case 3:
        router.push("screens/Timer");
        break;
      case 4:
        router.push("screens/Autocomplete");
        break;
      // case 5: router.push("screens/InfiniteImageScroll");
      // break;
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <Button onPress={() => handlePress(1)} title="Animation1" />
      <Button onPress={() => handlePress(2)} title="Animation2" />
      <Button onPress={() => handlePress(3)} title="Timer Animation" />
      <Button onPress={() => handlePress(4)} title="Autocomplete" />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
