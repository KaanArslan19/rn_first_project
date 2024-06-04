import { Colors } from "@/constants/Colors";
import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "./UI/Button";
import { LocationPickProps, Place } from "@/types";
import { router } from "expo-router";
type PlaceFormProps = {
  onCreatePlace: (place: Place) => void;
};
const PlaceForm: React.FC<PlaceFormProps> = ({ onCreatePlace }) => {
  const [enteredTitle, setEnteredTitle] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>();
  const [pickedLocation, setPickedLocation] = useState<LocationPickProps>();
  const changeTitleHandler = (enteredText: string) => {
    setEnteredTitle(enteredText);
  };

  function takeImageHandler(imageUri: string) {
    setSelectedImage(imageUri);
  }

  const pickLocationHandler = useCallback((location: LocationPickProps) => {
    setPickedLocation(location);
  }, []);

  const savePlaceHandler = () => {
    const placeData = new Place(enteredTitle, selectedImage!, pickedLocation!);
    onCreatePlace(placeData);
  };
  const GetBackHandler = () => {
    router.push("/");
  };
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
      <Button onPress={GetBackHandler}>Get Back</Button>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
