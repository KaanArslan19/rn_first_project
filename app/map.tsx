import IconButton from "@/components/UI/IconButton";
import { Location } from "@/types";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Map: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const { initialLat, initialLng } = useLocalSearchParams();
  const latitude = initialLat ? parseFloat(initialLat as string) : undefined;
  const longitude = initialLng ? parseFloat(initialLng as string) : undefined;
  const initialLocation =
    latitude !== undefined && longitude !== undefined
      ? { initialLat: latitude, initialLng: longitude }
      : undefined;

  const router = useRouter();

  const navigation = useNavigation();
  const region = {
    latitude: initialLocation ? initialLocation.initialLat : 37.78,
    longitude: initialLocation ? initialLocation.initialLng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const selectLocationHandler = (event: any) => {
    if (initialLocation) {
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat, lng });
  };
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "You have to pick a location (by tapping on the map) first!"
      );
      return;
    }

    router.navigate({
      pathname: "/addPlace",
      params: {
        pickedLat: selectedLocation.lat,
        pickedLng: selectedLocation.lng,
      },
    });
  }, [router, selectedLocation]);

  useEffect(() => {
    if (initialLocation) {
      return;
    }
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="save"
          size={24}
          color="black"
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);
  console.log(initialLocation?.initialLat);
  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
