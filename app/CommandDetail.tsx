import { useNavigation, useRoute } from "@react-navigation/native";
import React, { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";

const CommandDetailScreen: FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const { id, message, location, pilot_id, status, created_at } =
    route.params as any;

  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://10.0.2.2:8000/ws/commands/");

    newSocket.addEventListener("open", () => {
      console.log("WebSocket connection established");
      setLoading(false);
    });

    newSocket.addEventListener("error", (error) => {
      console.error("WebSocket Error: ", error);
    });

    newSocket.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });

    setSocket(newSocket);

    return () => {
      newSocket.close(); // Close the socket when the component unmounts
    };
  }, []);

  const handleResponse = (response: "accepted" | "rejected") => {
    if (socket) {
      const dataToSend = {
        command_id: id,
        status: response,
      };
      socket.send(
        JSON.stringify({ type: "command_response", data: dataToSend })
      );

      // After sending the response, navigate back to CommandListScreen
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Command Detail</Text>
      <Text style={styles.commandText}>ID: {id}</Text>
      <Text style={styles.commandText}>Message: {message}</Text>
      <Text style={styles.commandText}>Status: {status}</Text>
      <Text style={styles.commandText}>Pilot ID: {pilot_id}</Text>
      <Text style={styles.commandText}>Command Time: {created_at}</Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        />
      </MapView>

      <View style={styles.buttonsContainer}>
        <Button
          title="Accept"
          onPress={() => handleResponse("accepted")}
          disabled={loading}
        />
        <Button
          title="Reject"
          onPress={() => handleResponse("rejected")}
          disabled={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold" },
  map: { flex: 1, marginTop: 10, maxHeight: 550 },
  commandText: { fontSize: 16 },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});

export default CommandDetailScreen;
