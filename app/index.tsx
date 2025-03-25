import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CommandListScreenNavigationProp } from "../types"; // Import the correct type

export default function CommandListScreen() {
  const [commands, setCommands] = useState<any[]>([]);
  const navigation = useNavigation<CommandListScreenNavigationProp>(); // Use typed navigation

  useEffect(() => {
    const socket = new WebSocket("ws://10.0.2.2:8000/ws/commands/");

    socket.addEventListener("open", () => {
      console.log("WebSocket connection established");
    });

    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data && Array.isArray(data.commands)) {
        setCommands(data.commands);
      }
    });

    socket.addEventListener("error", (error) => {
      console.error("WebSocket Error: ", error);
    });

    socket.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assigned Commands</Text>
      <FlatList
        data={commands}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.commandItem}
            onPress={() =>
              navigation.navigate("CommandDetail", {
                id: item.id,
                pilot_id: item.pilot_id,
                plane_id: item.plane_id,
                status: item.status,
                message: item.message,
                location: item.location,
                created_at: item.created_at,
              })
            }
          >
            <Text style={styles.commandText}>Command ID: {item.id}</Text>
            <Text style={styles.commandText}>Pilot ID: {item.pilot_id}</Text>
            <Text style={styles.commandText}>Status: {item.status}</Text>
            <Text style={styles.commandText}>
              Command Time: {item.created_at}
            </Text>
            <Text style={styles.commandText}>Message: {item.message}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  commandItem: {
    padding: 15,
    backgroundColor: "#ffffff",
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  commandText: { fontSize: 16 },
});
