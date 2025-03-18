import React from "react";
import { View, SafeAreaView, Text, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  interpolateColor,
  Extrapolate,
  Extrapolation,
} from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";

const { width, height } = Dimensions.get("screen");

const textColor = "#2A3B38";
const gray = "#A0A0A0";
const slideWidth = width * 0.75;
const slideHeight = height * 0.5;

const slides = [
  {
    text: "Code",
    icon: "code-slash",
  },
  {
    text: "Enjoy Life",
    icon: "cafe",
  },
  {
    text: "@useRNRocket",
    icon: "rocket-sharp",
  },
];

const Slide = ({ slide, scrollOffset, index }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const input = scrollOffset.value / slideWidth;
    const inputRange = [index - 1, index, index + 1];

    return {
      transform: [
        {
          scale: interpolate(
            input,
            inputRange,
            [0.8, 1, 0.8],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      key={index}
      style={[
        {
          flex: 1,
          width: slideWidth,
          height: slideHeight,
          paddingVertical: 10,
        },
        animatedStyle,
      ]}
    >
      <View
        style={{
          padding: 10,
          alignItems: "center",
          borderColor: textColor,
          borderWidth: 3,
          borderRadius: 10,
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Ionicons name={slide.icon} size={100} color={textColor} />
        <Text
          style={{
            color: textColor,
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          {slide.text}
        </Text>
      </View>
    </Animated.View>
  );
};

const Indicator = ({ scrollOffset, index }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const input = scrollOffset.value / slideWidth;
    const inputRange = [index - 1, index];
    const animatedColor = interpolateColor(input, inputRange, [
      gray,
      textColor,
      // gray,
    ]);

    return {
      width: interpolate(input, inputRange, [20, 40, 20], Extrapolation.CLAMP),
      backgroundColor: animatedColor,
    };
  });

  return (
    <Animated.View
      style={[
        {
          marginHorizontal: 5,
          height: 20,
          borderRadius: 10,
          backgroundColor: textColor,
        },
        animatedStyle,
      ]}
    />
  );
};

const AnimatedBox = ({scrollOffset}) => {
  const boxAnimationStyle = useAnimatedStyle(() => {
    const input = scrollOffset.value / slideWidth;
    // const inputRange = [index - 1, index, index + 1];
    const inputRange = [0, slides.length-1];
    return {
      height: interpolate(input, inputRange, [0, height], Extrapolation.CLAMP)
    }
  })
  return (
    <Animated.View style={[{
      height: 0,
      width: 100,
      backgroundColor: "red",
      position: 'absolute',
      bottom: 0
    },
    boxAnimationStyle
    ]}>

    </Animated.View>
  )
}

const Animation1 = () => {
  const scrollOffset = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.x;
      const input = scrollOffset.value / slideWidth;
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-around" }}>
      <Animated.ScrollView
        scrollEventThrottle={1}
        horizontal
        snapToInterval={slideWidth}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          paddingHorizontal: (width - slideWidth) / 2,
          justifyContent: "center",
        }}
        onScroll={scrollHandler}
      >
        {slides.map((slide, index) => {
          return (
            <Slide
              key={index}
              index={index}
              slide={slide}
              scrollOffset={scrollOffset}
            />
          );
        })}
      </Animated.ScrollView>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
        {slides.map((_, index) => {
          return (
            <Indicator key={index} index={index} scrollOffset={scrollOffset} />
          );
        })}
      </View>

      <AnimatedBox scrollOffset={scrollOffset}/>

    </SafeAreaView>
  );
};

export default Animation1;