import { useState, useEffect } from 'react';
import Header from './components/Header';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import { generarId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg'
function App() {

  const [gastos, setGastos] = useState([])

  const [presupuesto, setPresupuesto] = useState(0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastoEditar, setGastoEditar] = useState({})

 


  useEffect(() => {
    //obejct.keys lo que haces es revisar las propiedades del objeto y verificar si tiene algo
    if(Object.keys(gastoEditar).length > 0){
      setModal(true)

  
      setTimeout(()=>{
        setAnimarModal(true)
      },500)
    }
  }, [gastoEditar])

  const handleNuevoGasto = () =>{
    setModal(true)
    setGastoEditar({})

    setTimeout(()=>{
      setAnimarModal(true)
    },500)
  }
  const guardarGasto = gasto =>{
    if(gasto.id){
      //actualizar
      const gastosActualizados = gastos.map((gastoState)=>gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    }else{
      //nuevo gasto
        gasto.id = generarId();
        gasto.fecha = Date.now();
        setGastos([...gastos, gasto])
    }
  

    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  const eliminarGasto = id => {
     const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
     setGastos(gastosActualizados)
  }
  return (
    <div className={modal ? 'fijar' : ' '}>
      <Header
        gastos = {gastos}
        presupuesto = {presupuesto}
        setPresupuesto = {setPresupuesto}
        isValidPresupuesto =  {isValidPresupuesto}
        setIsValidPresupuesto = {setIsValidPresupuesto}
      />

      {//el doble aspersan es una condicional, la diferencia de usar "?" es que este no es obligacion de poner un else es decir ":", si en dado caso no deseas retornar otro valor
          }
      { isValidPresupuesto && (     
        <>
          <main>
            <ListadoGastos
              gastos = {gastos}
              setGastoEditar = {setGastoEditar}
              eliminarGasto = {eliminarGasto}
            />
          </main>
          <div className='nuevo-gasto'>
              <img
                src={IconoNuevoGasto}
                alt='Icono nuevo gasto'
                onClick={handleNuevoGasto}
              />
          </div>
        </>
      )}
      {modal && <Modal
                  setModal = {setModal}
                  animarModal = {animarModal}
                  setAnimarModal = {setAnimarModal}
                  guardarGasto = {guardarGasto}
                  gastoEditar = {gastoEditar}
                  setGastoEditar = {setGastoEditar}
                />}

    </div>
  )
}

export default App
