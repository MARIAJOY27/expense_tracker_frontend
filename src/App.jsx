import { Route, Routes } from 'react-router-dom'
import './App.css'
import Landingpage from './pages/Landingpage'
import Expenses from './pages/Expenses'
import Income from './pages/Income'
import Report from './pages/Report'
import Footer from './components/Footer'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Add from './components/Add'

function App() {

  return (
    <>
    
    
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/home' element={<Landingpage/>} />
      <Route path='/expenses' element={<Expenses/>} />
      <Route path='/income' element={<Income/>} />
      <Route path='/report' element={<Report/>}/>
      <Route path='/add' element={<Add/>} />
    </Routes>

    <Footer/>
    </>
  )
}

export default App
