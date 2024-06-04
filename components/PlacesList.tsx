import { PlaceListProps, RootStackParamList } from "@/types";
import React from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import PlaceItem from "./PlaceItem";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const PlacesList: React.FC<PlaceListProps> = ({ places }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const selectPlaceHandler = (id: string) => {
    navigation.navigate("placeDetails", {
      placeId: id,
    });
  };
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem place={item} onSelect={selectPlaceHandler} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
  },
});

export default PlacesList;
