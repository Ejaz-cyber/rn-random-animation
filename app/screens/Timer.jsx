import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("screen");
const itemWidth = width * 0.2;

const Time = ({ time, index, scrollOffset }) => {
  const animated = useAnimatedStyle(() => {
    const inputRange = [
      (index - 2) * itemWidth,
      (index - 1) * itemWidth,
      index * itemWidth,
      (index + 1) * itemWidth,
      (index + 2) * itemWidth,
    ];

    return {
      opacity: interpolate(
        scrollOffset.value,
        inputRange,
        [0.1, 0.4, 1, 0.4, 0.1],
        Extrapolation.CLAMP
      ),
      transform: [
        {
          scale: interpolate(
            scrollOffset.value,
            inputRange,
            [0.5, 0.7, 1.5, 0.7, 0.5],
            Extrapolation.CLAMP
          ),
        },
      ],
      marginTop: interpolate(
        scrollOffset.value,
        inputRange,
        [100, 40, 0, 40, 100],
        Extrapolation.CLAMP
      ),
    };
  });

  return (
    <Animated.Text
      style={[
        {
          color: "black",
          fontSize: 40,
          fontWeight: "bold",
          width: itemWidth,
          textAlign: "center",
          // backgroundColor: 'red',
        },
        animated,
      ]}
    >
      {time}
    </Animated.Text>
  );
};

const Timer = () => {
  const timers = [...Array(11).keys()].map((i) => (i === 0 ? 1 : i * 3));
  const [timeDuration, setTimeDuration] = useState(1);
  const scrollOffset = useSharedValue(0);
  const buttonScale = useSharedValue(1);
  const [showSlider, setShowSlider] = useState(true);
  const flatlistRef = useRef(null);
  const countDownValue = useSharedValue(timeDuration);
  const [countDownState, setCountDownState] = useState(timeDuration)

  let maxButtonScale = 10;
  const minButtonScale = 1;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.x;
    },
  });

  const handleFinish = () => {
    if (buttonScale.value == minButtonScale) {
      setShowSlider(true);
    }
  };

  const handlePress = () => {
    console.log("press");
    if (buttonScale.value == minButtonScale) {
      setShowSlider(false);
      buttonScale.value = withSequence(
        withTiming(maxButtonScale, {
          duration: 500,
        }),
        withTiming(
          minButtonScale,
          {
            duration: timeDuration * 1000,
          },
          (isFinished) => {
            if (isFinished) {
              console.log("FINISHED");
              runOnJS(handleFinish)(true);
            }
          }
        )
      );
    }
  };

  const animatedButton = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: buttonScale.value,
        },
      ],
      backgroundColor: interpolateColor(
        buttonScale.value,
        [minButtonScale, maxButtonScale],
        ["#ff8133", "#f5ad5b"]
      ),
    };
  });

  const animatedCountDown = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            buttonScale.value,
            [minButtonScale, maxButtonScale],
            [0, 100]
          ),
        },
        {
          scale: 1.5
        },
      ],
      opacity: interpolate(
        buttonScale.value,
        [minButtonScale, maxButtonScale],
        [0, 1]
      ),
      // opacity: withDelay(50, withTiming(showSlider ? 1 : 0, { duration: 100 })), 
    };
  });

  const animatedFlatList = useAnimatedStyle(() => {
    return {
      opacity: withDelay(50, withTiming(showSlider ? 1 : 0, { duration: 200 })), 
    };
  });

  useEffect(() => {
    if (flatlistRef.current && showSlider) {
      // to restore the scroll position when showSlider toggles
      flatlistRef.current.scrollToOffset({
        offset: scrollOffset.value,
        animated: false,
      });
    }
  }, [showSlider]);

  useEffect(() => {
    setCountDownState(timeDuration)
    if (!showSlider) {
      let count = timeDuration;
      const interval = setInterval(() => {
        if (count >= 0) {
          // countDownValue.value = withTiming(count - 1, { duration: 1000 });
          setCountDownState(count)
          count -= 1;
        } else {
          clearInterval(interval);
        }
      }, 1000);
    }
  }, [showSlider, timeDuration])

  return (
    <View style={{ flex: 1, justifyContent: "center", }}>
      <Animated.View style={[animatedFlatList]}>
        
        {showSlider && (
          <Animated.FlatList
            ref={flatlistRef}
            scrollsToTop={false}
            data={timers}
            // style={animatedFlatList}
            scrollEventThrottle={16}
            keyExtractor={(item) => item.toString()}
            snapToInterval={itemWidth}
            decelerationRate="fast"
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <Time index={index} time={item} scrollOffset={scrollOffset} />
            )}
            onScroll={scrollHandler}
            contentContainerStyle={{
              alignItems: "center",
              paddingHorizontal: (width - itemWidth) / 2,
              justifyContent: "center",
            }}
            onMomentumScrollEnd={(e) => {
              setTimeDuration(
                timers[Math.round(e.nativeEvent.contentOffset.x / itemWidth)]
              );
            }}
          />
        )}
      </Animated.View>
        {!showSlider &&  (
          <Animated.Text
            style={[
              {
                color: "black",
                fontSize: 40,
                width: itemWidth,
                fontWeight: "bold",
                textAlign: "center",
                zIndex: 3,
                alignSelf: 'center',
                marginVertical: 50,
              },
              animatedCountDown,
            ]}
          >
            {countDownState}
          </Animated.Text>
        )}
        <Animated.View
          style={[
            animatedButton,
            {
              borderRadius: "50%",
              height: 100,
              width: 100,
              alignSelf: 'center',
            },
          ]}
        >
          <TouchableOpacity
            onPress={handlePress}
            style={{
              borderRadius: "50%",
              height: 100,
              width: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></TouchableOpacity>
        </Animated.View>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({});
