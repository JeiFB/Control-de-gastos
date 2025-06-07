import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Mensaje from '../Mensaje';

async function registerUser(userData) {
    return fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => Promise.reject(err));
        }
        return response.json();
    });
}

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMensaje('');

        // Validaciones
        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await registerUser({
                email: formData.email,
                password: formData.password
            });
            setMensaje('Registro exitoso');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err.error || 'Error al registrar usuario');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box sombra">
                <h2>Registro</h2>
                {error && <Mensaje tipo="error">{error}</Mensaje>}
                {mensaje && <Mensaje tipo="success">{mensaje}</Mensaje>}
                <form onSubmit={handleSubmit} className="formulario">
                    <div className="campo">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="campo">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="campo">
                        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirma tu Contraseña"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <input
                        type="submit"
                        value="Registrarse"
                    />
                </form>
                <p className="texto-cuenta">
                    ¿Ya tienes cuenta? {' '}
                    <button 
                        className="link-cuenta" 
                        onClick={() => navigate('/login')}
                    >
                        Inicia Sesión
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register; 