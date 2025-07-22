import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import GerenteUsuarios from './layout/Gerente_Usuarios.jsx'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div  className='fondo-imagen'>
      <GerenteUsuarios/>
      <div className="toast toast-top toast-end fixed z-[9999]" id="notificaciones"></div>
    </div>
  )
}
  
export default App
