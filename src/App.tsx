import { BrowserRouter } from "react-router";
import "./App.css";
import TaskManagement from "./TaskManagement";

function App() {
  return (
    <BrowserRouter>
      <TaskManagement />
    </BrowserRouter>
  );
}

export default App;
