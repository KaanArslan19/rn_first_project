import IconButton from "@/components/UI/IconButton";
import { Colors } from "@/constants/Colors";
import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
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
                onPress={() => router.navigate("addPlace")}
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
      </Stack>
    </>
  );
}
