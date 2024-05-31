import { PlaceItemProps, PlaceListProps } from "@/types";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

const PlaceItem: React.FC<PlaceItemProps> = ({ place, onSelect }) => {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: place.imageUri }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;
