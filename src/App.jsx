import { useState } from 'react'
import Header from './components/Header'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
function App() {
  const [presupuesto, setPresupuesto] = useState(0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const handleNuevoGasto = () =>{
    setModal(true)
  }


  return (
    <div>
      <Header
        presupuesto = {presupuesto}
        setPresupuesto = {setPresupuesto}
        isValidPresupuesto =  {isValidPresupuesto}
        setIsValidPresupuesto = {setIsValidPresupuesto}
      />

      {//el doble aspersan es una condicional, la diferencia de usar "?" es que este no es obligacion de poner un else es decir ":", si en dado caso no deseas retornar otro valor
          }
      { isValidPresupuesto && (      
        <div className='nuevo-gasto'>
            <img
              src={IconoNuevoGasto}
              alt='Icono nuevo gasto'
              onClick={handleNuevoGasto}
            />
        </div>
      )}
      {modal && <p>desde modal</p>}

    </div>
  )
}

export default App
