import { Place } from "@/types";
import * as SQLite from "expo-sqlite/legacy";

const database = SQLite.openDatabase("places.db");

export function init(): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log("Starting transaction...");
    database.transaction((tx) => {
      console.log("Executing SQL...");
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
        )`,
        [],
        () => {
          console.log("Table created successfully");
          resolve();
        },
        (_, error): boolean => {
          reject(error);
          return true;
        }
      );
    });
  });
}

export function insertPlace(place: Place): Promise<SQLite.SQLResultSet> {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, error): boolean => {
          reject(error);
          return true;
        }
      );
    });
  });
}

export function fetchPlaces(): Promise<Place[]> {
  const promise = new Promise<Place[]>((resolve, reject) => {
    database.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT * FROM places",
          [],
          (_, result) => {
            const places: Place[] = [];

            for (let i = 0; i < result.rows.length; i++) {
              const dp = result.rows.item(i);

              const place = new Place(
                dp.title,
                dp.imageUri,
                {
                  address: dp.address,
                  lat: dp.lat,
                  lng: dp.lng,
                },
                dp.id.toString()
              );

              places.push(place);
            }
            resolve(places);
          },
          (_, error) => {
            reject(error);
            return true;
          }
        );
      },
      (error) => {
        console.error("Transaction error:", error);
        return true;
      }
    );
  });

  return promise;
}

export async function fetchPlaceDetails(id: string): Promise<Place> {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places WHERE id = ?`,
        [id],
        (_, result) => {
          if (result.rows.length > 0) {
            const dbResult = result.rows.item(0);
            const place = new Place(
              dbResult.title,
              dbResult.imageUri,
              {
                address: dbResult.address,
                lat: dbResult.lat,
                lng: dbResult.lng,
              },
              dbResult.id
            );
            resolve(place);
          } else {
            reject(new Error("Place not found"));
          }
        },
        (_, error) => {
          reject(error);
          return true;
        }
      );
    });
  });
}
