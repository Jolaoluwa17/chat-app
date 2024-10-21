import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import { StatusBar } from "expo-status-bar";
import { RootComponent } from "./RootComponent";
import { store } from "./services/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer independent={true}>
        <StatusBar style="dark" />
        <RootComponent />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
registerRootComponent(App);
