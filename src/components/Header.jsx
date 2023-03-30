import NuevoPresupuesto from "./NuevoPresupuesto"
import ControlGastos from './ControlGastos'
const Header = ({
    gastos,
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
            gastos = {gastos}
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