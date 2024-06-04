import IconButton from "@/components/UI/IconButton";
import { Colors } from "@/constants/Colors";
import { init } from "@/utils/database";
import AppLoading from "expo-app-loading";
import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!dbInitialized) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary500,
          },
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 },
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "All Places",
            headerRight: ({ tintColor }) => (
              <IconButton
                icon="add"
                size={24}
                color={tintColor}
                onPress={() => router.push("/addPlace")}
              />
            ),
          }}
        />
        <Stack.Screen
          name="addPlace"
          options={{
            title: "Add a New Place",
          }}
        />

        <Stack.Screen
          name="placeDetails"
          options={{
            title: "Loading Place...",
          }}
        />
      </Stack>
    </>
  );
}
