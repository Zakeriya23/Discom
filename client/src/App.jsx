import axios from "axios";
import { UserContextProvider } from "./UserContext";
import Routes from "./Routes";
import "./App.css";

const baseURL = 'https://discom-33d5f13753f5.herokuapp.com/';
axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  );
}

export default App;
