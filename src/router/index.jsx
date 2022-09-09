import App from "../App"
import Edit from "../pages/Edit"
import MyList from "../pages/myList"
import Login from "../pages/Login"
import Means from "../pages/Means"
import Register from "../pages/Register"
import { BrowserRouter, Routes, Route } from "react-router-dom"
const BaseRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/edit" element={<Edit />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
        <Route path="/means" element={<Means />}></Route>
        <Route path="/myList" element={<MyList />}></Route>
      </Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  </BrowserRouter>
)
export default BaseRouter;
