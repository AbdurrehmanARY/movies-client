import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Create from "./pages/Create"
import Edit from "./pages/Edit"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { myProfile } from "./store/authSlice"
import ProtectedRoute from "./component/ProtectedRoute"


function App() {
   const dispatch=useDispatch()

   const {isAuthenticated,user}=useSelector((state)=>state.auth)
 
    
useEffect(()=>{
  dispatch(myProfile()).then((res)=>console.log("res",res.payload?.user))
},[dispatch,isAuthenticated])
  return (
    <Router>
      <Routes>
        <Route path="/auth">
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
       
          <Route path="/"   element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />

          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  )
}

export default App