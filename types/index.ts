export interface Place {
  imageUri: string;
  title: string;
  address: string;
  location: { lat: number; lng: number };
  id: string;
}

export interface PlaceListProps {
  places: Place[];
  onSelect: () => void;
}

export interface PlaceItemProps {
  place: Place;
  onSelect: () => void;
}
