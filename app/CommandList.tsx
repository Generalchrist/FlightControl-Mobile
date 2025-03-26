import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";

export default function CommandListScreen() {
  const [commands, setCommands] = useState<any[]>([]);
  const { pilot_id, socket, navigation } = useRoute().params as any;

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
      if (data && Array.isArray(data.commands)) {
        setCommands(
          pilot_id != 0
            ? data.commands.filter((x: any) => x.pilot_id == pilot_id)
            : data.commands
        );
      }
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
                socket: socket,
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
