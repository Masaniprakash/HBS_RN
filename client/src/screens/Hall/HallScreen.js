import React, { useLayoutEffect, useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  ScrollView,
  Text,
  View,
  Image,
  Button
} from "react-native";
import styles from "./styles";
import BackButton from "../../components/BackButton/BackButton";
import Book from "../Book/BooKScreen"

export default function HallScreen(props) {
  const [datePicker, setDatePicker] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [date, setDate] = useState(new Date());
  const { navigation, route } = props;
  
  function showDatePicker() {
    setDatePicker(true);
  };

  function onDateSelected(event, value) {
    setDate(value);
    console.log(value);
    setDatePicker(false);
  };

  const item = route.params?.item;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: "true",
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoRecipeContainer}>
        <Text style={styles.infoRecipeName}>{item.name}</Text>
        <View style={styles.infoContainer}>
          <Image
            style={styles.infoPhoto}
            source={require("../../../assets/hall.jpg")}
          />
          <Text style={styles.text}>Date = {date.toDateString()}</Text>
          {datePicker && (
            <DateTimePicker
              value={date}
              mode={'date'}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={true}
              onChange={onDateSelected}
              style={styles.datePicker}
            />
          )}
          {!datePicker && (
            <View style={{ margin: 10 }}>
              <Button title="Show Date Picker" color="green" onPress={showDatePicker} />
            </View>
          )}
          <View style={{ margin: 10 }}>
            <Button title="Book Now !" color="blue" onPress={() => setOpenModel(!openModel)} />
          </View>
        </View>
        {console.log(item._id)}
        {openModel && <Book setOpenModel={setOpenModel} hall={item} dates={date} />}
      </View>
    </ScrollView>
  );
}


