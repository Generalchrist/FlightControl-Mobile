import { StackNavigationProp } from "@react-navigation/stack";

// Define the navigation types for each screen
export type RootStackParamList = {
  CommandList: undefined; // CommandList does not take any params
  CommandDetail: {
    id: string;
    pilot_id: string;
    plane_id: string;
    status: string;
    message: string;
    location: any;
    created_at: Date;
  };
};

export type CommandListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CommandList"
>;

export type CommandDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CommandDetail"
>;
