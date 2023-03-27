import NuevoPresupuesto from "./NuevoPresupuesto"
import ControlGastos from './ControlGastos'
const Header = ({
    presupuesto, 
    setPresupuesto,
    isValidPresupuesto, 
    setIsValidPresupuesto}
    ) => {
    return (
      <header>
        <h1>Planificador de Gastos</h1>

        {isValidPresupuesto ? (
          
          <ControlGastos
            presupuesto ={presupuesto}
          />
        ):(
          <NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValidPresupuesto = {setIsValidPresupuesto}
        />

        )}


      </header>
    )
}

export default Header