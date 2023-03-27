import React from 'react'

const Mensaje = ({children, tipo}) => {
  return (
    <div className={`alerta ${tipo}`}>{children}</div>
  )
}

export default Mensaje



/* {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>} osea mensaje contiene adentro "el presupuesto no es valido " mediante el setMensaje en la validacion que hicimos con if ,
creamos un componente llamando Mensaje que contiene :
 
  const Mensaje = ({children,tipo}) => {
  return (
    <div className={`alerta ${tipo}`}>{children}</div>
  )
}
 
mediante el batic le agregamos la clase `alerta` y con el ${tipo} lo agregregamos en forma dinamica que va contener en este caso la clase .error 
me quedo la duda de que hace el children  ? , pero creo que contiene adentro el string("el presupuesto no es valido") del setMensaje
 
y volviendo al primer código : {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
 
en el caso de que la validación sea incorrecta se va mostrar en pantalla "NO ES UN PRESUPUESTO VALIDO" con las clases del index.css
 
Resumen : creamos un componente que se llama Mensaje y lo pasábamos vía props , lo importamos y va tomar las clases `alerta ${tipo}` en el caso que falle la validación y se mostrara en pantalla*/