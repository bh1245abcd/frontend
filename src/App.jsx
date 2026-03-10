import "./App.css";
import Approutes from "./Routes/Approutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Approutes />
    </>
  );
}

export default App;
