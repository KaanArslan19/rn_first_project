type PlaceClassLocation = {
  address: string;
  lat: number;
  lng: number;
};

export class Place {
  title: string;
  imageUri: string;
  address: string;
  location: { lat: number; lng: number };
  id: string;

  constructor(
    title: string,
    imageUri: string,
    location: PlaceClassLocation,
    id: string
  ) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, lng: location.lng };
    this.id = id;
  }
}

export interface PlaceListProps {
  places: Place[];
  onSelect: () => void;
}

export interface PlaceItemProps {
  place: Place;
  onSelect: (id: string) => void;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface LocationPickProps {
  address: string;
  lat: number;
  lng: number;
}

export type RootStackParamList = {
  placeDetails: { placeId: string };
  map: { initialLat: number; initialLng: number };
  addPlace: { pickedLat: number; pickedLng: number };
};
