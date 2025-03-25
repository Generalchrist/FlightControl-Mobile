import { useRoute } from "@react-navigation/native";
import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const CommandDetailScreen = () => {
  const route = useRoute(); // This will give you access to the route params
  const { id, message, location, pilot_id, status, created_at } =
    route.params as any;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Command Detail</Text>
      <Text style={styles.commandText}>ID: {id}</Text>
      <Text style={styles.commandText}>Message: {message}</Text>
      <Text style={styles.commandText}>Command ID: {id}</Text>
      <Text style={styles.commandText}>Pilot ID: {pilot_id}</Text>
      <Text style={styles.commandText}>Status: {status}</Text>
      <Text style={styles.commandText}>Time: {created_at}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 3,
          longitudeDelta: 3,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold" },
  map: { flex: 1, marginTop: 10, maxHeight: 300 },
  commandText: { fontSize: 16 },
});

export default CommandDetailScreen;
