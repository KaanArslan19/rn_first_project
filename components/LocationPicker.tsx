import { Colors } from "@/constants/Colors";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { View, StyleSheet, Alert, Image, Text } from "react-native";
import OutlinedButton from "./UI/OutlinedButton";
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";
import { getAddress, getMapPreview } from "@/utils/location";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import { Location, LocationPickProps, Place } from "@/types";
interface PreviousParams {
  pickedLat: string | null;
  pickedLng: string | null;
}
type LocationPickerProps = {
  onPickLocation: (location: LocationPickProps) => void;
};
const LocationPicker: React.FC<LocationPickerProps> = ({ onPickLocation }) => {
  const [pickedLocation, setPickedLocation] = useState<Location | null>(null);
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  const router = useRouter();
  const params = useLocalSearchParams();
  const previousParams = useRef<PreviousParams>({
    pickedLat: null,
    pickedLng: null,
  });

  const verifyPermissions = async () => {
    if (
      locationPermissionInformation?.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }

    return true;
  };

  const updatePickedLocation = useCallback(() => {
    const pickedLat = params.pickedLat as string | undefined;
    const pickedLng = params.pickedLng as string | undefined;

    if (
      pickedLat &&
      pickedLng &&
      (pickedLat !== previousParams.current.pickedLat ||
        pickedLng !== previousParams.current.pickedLng)
    ) {
      const mapPickedLocation = {
        lat: parseFloat(pickedLat),
        lng: parseFloat(pickedLng),
      };
      if (!isNaN(mapPickedLocation.lat) && !isNaN(mapPickedLocation.lng)) {
        setPickedLocation(mapPickedLocation);
        previousParams.current = { pickedLat, pickedLng };
      }
    }
  }, [params]);

  useFocusEffect(updatePickedLocation);
  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.lng
        );
        onPickLocation({ ...pickedLocation, address: address });
      }
    }

    handleLocation();
  }, [pickedLocation, onPickLocation]);
  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const pickOnMapHandler = () => {
    router.push("map");
  };

  let locationPreview = <Text>No location picked yet.</Text>;
  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>

        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
