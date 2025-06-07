import {useState} from 'react';
import PropTypes from 'prop-types';

async function loginUser(credentials){
    console.log(credentials);
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
    }).then(data => data.json())
}

const Login = ({setToken}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({email, password});
        setToken(token);
    }
    
    return(
        <div className="login-container">
            <div className="login-box sombra">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit} className="formulario">
                    <div className="campo">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Tu Email" 
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="campo">
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Tu Contraseña" 
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <input 
                        type="submit" 
                        value="Iniciar Sesión"
                    />
                </form>
            </div>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;