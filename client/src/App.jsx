import axios from "axios";
import { UserContextProvider } from "./UserContext";
import Routes from "./Routes";
import "./App.css";

const baseURL = process.env.REACT_APP_API_URL;
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
