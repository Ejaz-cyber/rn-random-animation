import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const productsJson = require("../../assets/products.json");
const { width, height } = Dimensions.get("screen");

const viewHeight = 100;
let headerHeight = 290;
const Product = ({ item }) => {
  const handlePress = (id) => {
    console.log(id);
    router.push(`/screens/details/${id}`);
    // router.push(`/screens/details/PD`)
  };
  return (
    <Pressable onPress={() => handlePress(item.id)}>
      <View style={styles.container}>
        <View style={{ maxWidth: 180 }}>
          <Animated.Text
            sharedTransitionTag="tagTitle"
            numberOfLines={2}
            style={styles.text}
          >
            {item.title}
          </Animated.Text>
          <Animated.Text sharedTransitionTag="tagDesc" numberOfLines={3} style={styles.textDesc}>
            {/* {item.description} */}
            Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.
          </Animated.Text>
        </View>
        <Animated.Image
          sharedTransitionTag="tag"
          style={styles.imageContainer}
          source={{ uri: item.image }}
        />
      </View>
    </Pressable>
  );
};

const StoreHeader = ({ scrollOffset }) => {
  const animatedHeaderInfo = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [0, height / 2],
            [0, -viewHeight],
            Extrapolation.CLAMP
          ),
          // scale: interpolate(scrollOffset.value, [0, height/2], [1, 0.8], Extrapolation.CLAMP)
        },
      ],
      opacity: interpolate(
        scrollOffset.value,
        [0, height / 2],
        [1, 0],
        Extrapolation.CLAMP
      ),
    };
  });

  const animatedHeader = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollOffset.value,
        [0, height / 2],
        [headerHeight, headerHeight - viewHeight],
        Extrapolation.CLAMP
      ),
      // opacity: interpolate(scrollOffset.value, [0, height], [1, 0], Extrapolation.CLAMP)
    };
  });

  const animatedSearchBar = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [0, height / 2],
            [0, -viewHeight],
            Extrapolation.CLAMP
          ),
          // scaleY: interpolate(scrollOffset.value, [0, height], [1, 0], Extrapolation.CLAMP)
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.storeHeader, animatedHeader]}>
      <View
        style={{
          height: 80,
          width: 80,
          backgroundColor: "lightblue",
          alignSelf: "center",
        }}
      >
        <Text>Logo</Text>
      </View>

      <Animated.View
        style={[
          { height: viewHeight, backgroundColor: "lightblue", margin: 10 },
          animatedHeaderInfo,
        ]}
      />
      <Animated.View
        style={[
          { height: 40, backgroundColor: "coral", margin: 10 },
          animatedSearchBar,
        ]}
      />
    </Animated.View>
  );
};

const Animation2 = () => {
  const scrollOffset = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <StoreHeader
        scrollOffset={scrollOffset}
        //  onLayout={handleHeaderLayout}
      />

      <Animated.FlatList
        data={productsJson}
        renderItem={({ item }) => <Product item={item} />}
        keyExtractor={(item, index) => index.toString()}
        onScroll={scrollHandler} // Attach the scrollHandler
        scrollEventThrottle={16} // Smooth scrolling
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "auto",
    flexDirection: "row",
    minWidth: 200,
    justifyContent: "space-between",
    margin: 4,
    padding: 20,
  },
  text: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    height: 160,
    width: 160,
    backgroundColor: "lightgray",
    marginTop: 0,
  },
  storeHeader: {
    backgroundColor: "steelblue",
    padding: 20,
    alignItems: "stretch",
    height: headerHeight,
  },
  textDesc: {
    fontSize: 14,
    marginTop: 10,
  },
});

export default Animation2;
