import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  useLocalSearchParams,
  useRouter,
  useSearchParams,
} from "expo-router/build/hooks";
import Animated from "react-native-reanimated";
const loader = require("../../../assets/images/icon.png")

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);

  console.log("first", id);

  useEffect(() => {
    const products = require("../../../assets/products.json");
    let item = products.find((item) => item.id == id);
    setProduct(item);
  }, [id]);

  if (!product) {
    return <Text>loading</Text>;
  }

  return (
    <View style={styles.container}>
      <Animated.Image 
        style={styles.imageContainer}
        source={{ uri: product.image }} 
        sharedTransitionTag="tag"
        />
      <Animated.Text style={{ 
        fontSize: 24, 
        color: "black", 
        fontWeight: "bold",
        margin: 10
        }}
        sharedTransitionTag="tagTitle">
        {product.title}
      </Animated.Text>
      <Animated.Text style={{ 
        fontSize: 18, 
        color: "black", 
        fontWeight: 'medium',
        margin: 10
        }}
        sharedTransitionTag="tagDesc">
        {/* {product.description} */}
        Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.
      </Animated.Text>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: 400,
    width: "100%",
    backgroundColor: "lightgray",
  },
});
