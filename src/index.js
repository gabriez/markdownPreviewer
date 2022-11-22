import {render, createRoot} from "react-dom/client";
import App from "./components/App.jsx"


let root = createRoot(document.getElementById("root"));
root.render(<App/>);