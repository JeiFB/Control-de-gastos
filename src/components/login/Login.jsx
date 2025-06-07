import {useState} from 'react';
import PropTypes from 'prop-types';
import Mensaje from '../Mensaje';
import { useNavigate } from 'react-router-dom';

async function loginUser(credentials){
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => Promise.reject(err));
        }
        return response.json();
    });
}

const Login = ({setToken}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        setMensaje('');

        try {
            const token = await loginUser({email, password});
            setMensaje('Inicio de sesión exitoso');
            setToken(token);
        } catch (err) {
            setError(err.error || 'Error al iniciar sesión');
        }
    }
    
    return(
        <div className="login-container">
            <div className="login-box sombra">
                <h2>Iniciar Sesión</h2>
                {error && <Mensaje tipo="error">{error}</Mensaje>}
                {mensaje && <Mensaje tipo="success">{mensaje}</Mensaje>}
                <form onSubmit={handleSubmit} className="formulario">
                    <div className="campo">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Tu Email" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="campo">
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Tu Contraseña" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <input 
                        type="submit" 
                        value="Iniciar Sesión"
                    />
                </form>
                <p className="texto-cuenta">
                    ¿No tienes una cuenta? {' '}
                    <button 
                        className="link-cuenta" 
                        onClick={() => navigate('/register')}
                    >
                        Regístrate
                    </button>
                </p>
            </div>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;