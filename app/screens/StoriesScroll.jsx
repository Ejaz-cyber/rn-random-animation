import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { users } from "../../constants";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height, width } = Dimensions.get("window");
const appBarHeight = 40;
const backDropHeight = 100;

const StoriesScroll = () => {
  const insets = useSafeAreaInsets();
  const { top, bottom, left, right } = insets;
  const bsAnimatedIndex = useSharedValue(0);
  const bottomSheetRef = useRef(null);
  const [statusUsers, setStatusUsers] = useState([]);
  console.log(top, bottom, left, right);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    let self = {
      id: 0,
      name: "You",
      message: "",
      image: "https://randomuser.me/api/portraits/med/men/0.jpg",
      hasStatus: false,
      statusSeen: false,
    };
    let filtered = users.filter((user) => user.hasStatus);
    let sorted = filtered.sort((a, b) => {
      if (a.statusSeen && !b.statusSeen) return -1;
      if (!a.statusSeen && b.statusSeen) return 1;
    });
    console.log(JSON.stringify(sorted, null, 2));
    setStatusUsers([self, ...sorted]);
  }, [users]);

  const snapPoints = useMemo(() => {
    return [
      // height - top - appBarHeight - backDropHeight,
      // height - top - appBarHeight,
      "75%",
      "85%",
    ];
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          margin: 10,

          // backgroundColor: "gray",
        }}
      >
        <Image
          src={item.image}
          style={{
            height: 60,
            width: 60,
            borderRadius: 40,
          }}
        />
        <View style={{ paddingHorizontal: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", lineHeight: 28 }}>
            {item.name}
          </Text>

          <Text
            style={{ fontSize: 14, maxWidth: "90%", color: "gray" }}
            numberOfLines={2}
          >
            {item.message}
          </Text>
        </View>
      </View>
    );
  };

  const animatedStyleMap = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            bsAnimatedIndex.value,
            [0, 1],
            [1, 0.5],
            Extrapolation.CLAMP
          ),
        },
        {
          translateY: interpolate(
            bsAnimatedIndex.value,
            [0, 1],
            [30, 0],
            // [height * 0.033, 0],
            Extrapolation.CLAMP
          ),
        },
        {
          translateX: interpolate(
            bsAnimatedIndex.value,
            [0, 1],
            [64, 0],
            Extrapolation.CLAMP
          ),
        },
      ],
      opacity: interpolate(
        bsAnimatedIndex.value,
        [0, 1],
        [0, 1],
        Extrapolation.CLAMP
      ),
    };
  });

  const animatedStatusMargin = useAnimatedStyle(() => {
    return {
      marginHorizontal: interpolate(
        bsAnimatedIndex.value,
        [0, 1],
        [10, -5],
        Extrapolation.CLAMP
      ),
    };
  });

  const animatedChatText = useAnimatedStyle(() => {
    return {
      left: interpolate(
        bsAnimatedIndex.value,
        [0, 1],
        [width / 2, width / 2 + 30],
        Extrapolation.CLAMP
      ),
    };
  });

  const renderStatusUser = ({ item }) => {
    // console.log(item);
    return (
      <Animated.View key={item.id} style={{alignItems: 'center'}}>
        <Image
          src={item.image}
          style={{
            height: 70,
            width: 70,
            borderRadius: "50%",
            marginHorizontal: 8,
            // borderWidth: 2
          }}
        />
        <Animated.Text >{item.name.split(" ")[0]}</Animated.Text>
      </Animated.View>
    );
  };

  const animatedStyleList = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        bsAnimatedIndex.value,
        [0, 0.1],
        [1, 0],
        Extrapolation.CLAMP
      ),
      // transform: [
      //   {
      //     translateY: interpolate(
      //       bsAnimatedIndex.value,
      //       [0, 1],
      //       [-height * 0.05, 0],
      //       Extrapolation.CLAMP
      //     ),
      //   },
      // ]
    };
  });
  // renders
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView
        style={{
          // height: "20%",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Animated.View style={[{ flexDirection: "row" }, animatedStyleMap]}>
          {statusUsers
            .filter((user) => user.statusSeen)
            .map((item, index) => {
              return (
                <Animated.View key={item.id} 
                style={[animatedStatusMargin]}
                >
                  <Image
                    src={item.image}
                    style={[{ height: 70, width: 70, borderRadius: "50%" }]}
                  />
                </Animated.View>
              );
            })}
        </Animated.View>
        {/* <Animated.Text style={[animatedChatText,{position: 'absolute'}]}>Chats</Animated.Text> */}
      </SafeAreaView>

      <Animated.FlatList
        data={statusUsers}
        renderItem={renderStatusUser}
        horizontal={true}
        style={[
          animatedStyleList,
          // {backgroundColor: 'green'},
          {
            transform: [{ translateY: -30 }],
            // transform: [{ translateY: -height * 0.05 }],
            // backgroundColor: "beige",
          },
        ]}
      />
      <BottomSheet
        snapPoints={snapPoints}
        handleComponent={null}
        index={0}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        backgroundStyle={{
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
        }}
        enableDynamicSizing={false}
        animatedIndex={bsAnimatedIndex}
      >
        <BottomSheetFlatList
          overScrollMode="never" // Prevent overscroll for Android
          bounces={false} // Prevent overscroll for iOS
          scrollToOverflowEnabled={false}
          data={users}
          renderItem={renderItem}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default StoriesScroll;
