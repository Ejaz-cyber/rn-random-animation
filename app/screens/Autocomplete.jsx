import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
// import { TextInput } from 'react-native-gesture-handler'

const Autocomplete = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const debounceTimer = useRef(null);

  const fetchData = async () => {
    try {
      let response = await axios.get(
        `https://dummyjson.com/products/search?limit=10&q=${query}`
      );
      // let responseJson = JSON.stringify(response.data);
      setSuggestions(response.data.products);
      console.log("-----------------")

      console.log("search query:", query)
      response.data.products.map(item => (
        console.log(item.title)
      ))
      console.log(response.status);
      console.log("-----------------")
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(query.length >= 3){
      console.log("\n\nstarted debounce")
      clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        console.log("fetching")
        fetchData();
      }, 200)
    }

    if(query.length == 0){
      setSuggestions([])
    }

    return () => {
      clearTimeout(debounceTimer.current)
    }
  }, [query]);

  const handlePress = (item) => {
    console.log("clicked on ", item)
  }

  return (
    <View>
      <Text>Autocomplete</Text>
      <TextInput
        style={{
          width: "100%",
          height: 40,
          borderWidth: 2,
          borderColor: "black",
          fontSize: 20,
        }}
        onChangeText={setQuery}
        value={query}
      />
      <FlatList 
        data={suggestions}
        renderItem={({item}) => {
          return (
            <TouchableOpacity style={{backgroundColor: 'gray', marginVertical: 2}} onPress={() => handlePress(item)}>
              <Text style={{padding: 4, fontSize: 18}}>
              {item.title}
              </Text>
            </TouchableOpacity>
          )          
        }}
        />
    </View>
  );
};

export default Autocomplete;

const styles = StyleSheet.create({});
