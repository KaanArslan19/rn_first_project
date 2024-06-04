import React, { useEffect, useState } from "react";
import { ScrollView, Image, View, Text, StyleSheet, Alert } from "react-native";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";

import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "@/constants/Colors";
import { Place } from "@/types";
import { fetchPlaceDetails } from "@/utils/database";

function PlaceDetails() {
  const [fetchedPlace, setFetchedPlace] = useState<Place | null>(null);
  const { placeId } = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();
  const selectedPlaceId = placeId as string;

  useEffect(() => {
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    }
    loadPlaceData();
  }, [selectedPlaceId]);
  function showOnMapHandler() {
    if (!fetchedPlace || !fetchedPlace.location) {
      Alert.alert(
        "Location not available",
        "The location data is not available."
      );
      return;
    }
    router.push({
      pathname: "/map",
      params: {
        initialLat: fetchedPlace.location.lat,
        initialLng: fetchedPlace.location.lng,
      },
    });
  }

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
