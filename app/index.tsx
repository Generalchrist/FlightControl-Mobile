import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  TextInput,
  Image,
  Button,
  View,
  Text,
  Alert,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
export default function index() {
  const ws = useRef(new WebSocket("ws://10.0.2.2:8000/ws/commands/")).current;
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [pilotId, setPilotId] = useState("");
  const navigation = useNavigation<any>();

  useEffect(() => {
    ws.onopen = () => console.log("ws opened");
    ws.onclose = () => console.log("ws closed");

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const handleResponse = () => {
    console.log(Number(pilotId));
    if (!!Number(pilotId) || Number(pilotId) == 0) {
      navigation.navigate("CommandList", {
        pilot_id: pilotId,
        socket: socket,
        navigation: navigation,
      });
    } else {
      Alert.alert("Validation Error", "Please enter a valid number", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Image
          source={{ uri: "https://i.ytimg.com/vi/rbZoV6X3Z_Y/sddefault.jpg" }}
          style={{ width: 400, height: 400 }}
        />
        <Text style={styles.title}>
          Enter requested pilot id
          {"\n"}
          For all commands please just press the button
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setPilotId}
          value={pilotId}
        />
        <View style={styles.button}>
          <Button title="See Commands" onPress={() => handleResponse()} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    margin: 12,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
    marginTop: 50,
  },
});
