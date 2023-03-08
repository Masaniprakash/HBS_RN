import React, { useEffect, useState } from "react";
import { FlatList, Text, StyleSheet, TextInput, View, TouchableHighlight, Image, ScrollView, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import listingsApi from "../../api/Listing";
import Checkbox from "expo-checkbox"


export default function Book({ setOpenModel, hall, dates }) {
  // console.log(hall, dates);
  const [success, setSuccess] = useState("")
  const [user, setUser] = useState()
  const [error, setError] = useState("")
  const [selectedHours, setSelectedHours] = useState([])
  const [data, setData] = useState([])
  const [loading, setLoading] = useState("")
  const [isChecked, setChecked] = useState();
  console.log(isChecked);

  useEffect(() => {
    let fetch = async () => {
      // let res = await axios.get(`http://localhost:4000/api/hall/getHallHours/${hallId}`)
      setLoading(true)
      try {
        const response = await listingsApi.getListings(`/hall/getHallHours/${hall._id}`);
        setLoading(false)
        console.log(response.data);
        if (!response.ok) { return setError(true) }
        else {
          setError(false)
          setData(response.data)
        }
      } catch (error) {
        setLoading(false)
        setError(true)
        console.log(error.message);
      }

    }
    fetch()
  }, [])
  let mass = new Date(dates).getTime()
  console.log(mass);

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    // console.log(checked);//if checket it true uncheck false
    // console.log(value);
    setSelectedHours(
      checked
        ? [...selectedHours, value]
        : selectedHours.filter((item) => item !== value)//its unchecked to remove the id
    );
  };

  let dateArray = []
  let getTimeDate = new Date(dates).getTime()
  dateArray.push(getTimeDate)
  const isAvailable = (hoursNumber) => {
    const isFound = hoursNumber.unavailableDates
      .some((item) => dateArray.includes(new Date(item.date)?.getTime()))
    return !isFound;
  };
  const isAvailableName = (hoursNumber) => {
    const isFound = hoursNumber.unavailableDates.some((item) => dateArray.includes(new Date(item.date)?.getTime()))
    const isFou = hoursNumber.unavailableDates.find((item) => dateArray.includes(new Date(item.date)?.getTime()))
    if (isFound) {
      return `${isFou.name}(${isFou.department})`;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Select hours</Text>
          <MaterialCommunityIcons onPress={() => setOpenModel(false)} name={"close-circle-outline"} size={30} />
        </View>
        {data?.map((item, index) => (
          <View key={index} >
            {item?.hourNumbers?.map((hourNo, index) => (

              <View style={styles.hourCon} key={index}>
                <View style={styles.checkCon}>
                  <Text style={styles.hourNo}>{hourNo?.number}</Text>
                  <TextInput onPressIn={had} >
                  <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    disabled={!isAvailable(hourNo)}
                    onValueChange={setChecked}
                    
                  />
                  </TextInput  >
                </View>
                <Text style={styles.name}>{isAvailableName(hourNo)}</Text>
              </View>
            ))}
          </View>
        ))}
        <Button title="Book Now" />



      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    backgroundColor: "green",
    top: 52,
    width: "100%",
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20
  },
  wrapper: {
    backgroundColor: "white",
    padding: 30,
    width: 300,
    textAlign: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  hourCon: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  checkCon: {
    margin: 8,
    flexDirection: "row",
  },
  checkbox: {
    padding: 8,
    marginLeft: 10
  },
  name: {
    marginVertical: 3
  }
});