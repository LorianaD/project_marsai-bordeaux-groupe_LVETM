import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './components/Layout/MainLayout.jsx'
import Home from './pages/Home.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route element={<MainLayout/>}>
          < Route path='/' element={<Home/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App