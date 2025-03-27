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
  const ws = useRef(
    new WebSocket(process.env.EXPO_WS_COMMAND_CONSUMER!)
  ).current;
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const navigation = useNavigation<any>();
  let pilotId: string = "";

  useEffect(() => {
    ws.onopen = () => console.log("ws opened");
    ws.onclose = () => console.log("ws closed");

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const handleOnChange = (e: any) => {
    pilotId = e as string;
  };

  const handleResponse = () => {
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
        <TextInput style={styles.input} onChangeText={handleOnChange} />
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
