import ReactDOM from "react-dom";
import {createRoot} from "react-dom/client"


import Router from "./router"
import "./assets/base.css"


const root = createRoot(document.getElementById("root"))
root.render(

    <Router />
)

