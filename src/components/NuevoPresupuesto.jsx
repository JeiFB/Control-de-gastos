import React from 'react'

const NuevoPresupuesto = () => {
  return (
    <div className="contenedor-presupuesto contenedo sombra">
        <form action0="" className="formulario">
            <div className="campo">
                <label htmlFor="">Definir presupuesto</label>
                <input
                    className='Nuevo nuevo-presupuesto' 
                    type="text" 
                    placeholder='Añade tu presupuesto'
                />
            </div>
            
            <input 
            type="submit" 
            value="Añadir"
            />
        </form>
    </div>
  )
}

export default NuevoPresupuesto