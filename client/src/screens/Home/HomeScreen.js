import React, { useLayoutEffect, useEffect, useState } from "react";
import { FlatList, Text, View, Button, TouchableHighlight, Image, ScrollView } from "react-native";
import styles from "./styles";
import MenuImage from "../../components/MenuImage/MenuImage";
import { useIsFocused } from '@react-navigation/native'
import listingsApi from "../../api/Listing";

export default function HomeScreen(props) {
  const { navigation } = props;
  const isFocused = useIsFocused();
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [dataMessage, setDataMessage] = useState();
  const [loading, setLoading] = useState(false);
  let img = [
    { url: require("../../../assets/hall1.jpg") },
    { url: require("../../../assets/hall2.jpg") },
    { url: require("../../../assets/hall3.jpg") },
    { url: require("../../../assets/hall4.jpg") },
  ]

  const loadData = async () => {
    setLoading(true)
    try {
      const response = await listingsApi.getListings("/hall");
      setLoading(false)
      if (!response.ok) { return setError(true) }
      else {
        setError(false)
        setData(response.data)
        if (response?.data?.length === 0) {
          setDataMessage("No hall available so please add hall")
        }
      }
    } catch (error) {
      setLoading(false)
      setError(true)
      console.log(error.message);
    }
  }
  useEffect(() => {
    loadData();
  }, [isFocused]);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <MenuImage
  //         onPress={() => {
  //           navigation.openDrawer();
  //         }}
  //       />
  //     ),
  //     headerRight: () => <View />,
  //   });
  // }, []);

  const onPressHall = (item) => {
    navigation.navigate("Hall", { item });
  };

  return (
    <ScrollView style={styles.container}>
      {error && (
        <>
          <Text>Server could not load now...</Text>
          <Button title="reload" onPress={loadData} />
        </>
      )}
      {
        loading && (
          <View >
            <Text>loading please wait...</Text>
          </View>
        )
      }
      <View>
        {/* <FlatList vertical showsVerticalScrollIndicator={false} numColumns={1} data={recipes} renderItem={renderRecipes} keyExtractor={(item) => `${item.id}`} /> */}
        {dataMessage && <Text>{dataMessage}</Text>}
        {data?.map((item, index) => {
          return (
            <TouchableHighlight underlayColor="rgba(73,182,77,0.9)"
              key={index} onPress={() => onPressHall(item)}
            >
              <View style={styles.homeContainer}>
                <Image style={styles.homePhoto} source={item.url || img[index]?.url} />
                <Text style={styles.homeName}>{item.name}</Text>
                <Text style={styles.btn}>Book Now</Text>
              </View>
            </TouchableHighlight>)
        })}
      </View>
    </ScrollView>
  );
}
