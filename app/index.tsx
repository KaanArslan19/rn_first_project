import PlacesList from "@/components/PlacesList";
import { Place } from "@/types";
import { fetchPlaces } from "@/utils/database";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useState, useRef } from "react";

const AllPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
  const { place } = useLocalSearchParams();
  const parsedPlace = place ? JSON.parse(place as string) : null;
  const addedPlacesRef = useRef<Set<string>>(new Set());

  useFocusEffect(
    useCallback(() => {
      async function loadPlaces() {
        try {
          const places = await fetchPlaces();
          setLoadedPlaces(places);
        } catch (error) {
          console.error("Error loading places:", error);
        }
      }
      loadPlaces();
    }, [place])
  );

  const onSelectHandler = () => {};

  return <PlacesList places={loadedPlaces} onSelect={onSelectHandler} />;
};

export default AllPlaces;
