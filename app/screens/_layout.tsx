import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  useNavigation,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Text, TouchableOpacity } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <IconSymbol size={20} color="#808080" name="chevron.left" />
    </TouchableOpacity>
  );
};

export default function ScreensLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="Screen2" />
        <Stack.Screen name="Screen1" />
        <Stack.Screen name="Animation1" />
        <Stack.Screen name="Animation2" />
        <Stack.Screen name="Animation2Details" />
        <Stack.Screen
          name="Timer"
          options={{
            headerShown: true,
            headerTitle: "Timer Animation",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="StoriesScroll"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Autocomplete" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
