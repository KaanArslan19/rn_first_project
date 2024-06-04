import PlaceForm from "@/components/PlaceForm";
import { Place } from "@/types";
import { insertPlace } from "@/utils/database";
import { useRouter } from "expo-router";
import React from "react";

const AddPlace = () => {
  const router = useRouter();
  const createPlaceHandler = async (place: Place) => {
    await insertPlace(place);
    router.push("/");
  };
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
