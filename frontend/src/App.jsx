import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Signin from './Pages/Signin'
import SignOut from './Pages/SignUp'
import SignUp from './Pages/SignUp'
import About from './Pages/About'
import Profile from './Pages/Profile'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'

function App() {

  return (
 <div>
<BrowserRouter>
  <Header />
  
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/sign-in' element={<Signin />} />
    <Route path='/sign-up' element={<SignUp />} />
    <Route path='/about' element={<About />} />

    <Route element={<PrivateRoute />}>
      <Route path='/profile' element={<Profile />} />
    </Route>
  </Routes>
</BrowserRouter>
 </div>
   
     
  )
}

export default App
