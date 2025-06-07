import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { LocalStorage } from 'node-localstorage';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializar localStorage
const localStorage = new LocalStorage('./scratch');

const app = express();

app.use(cors());
app.use(express.json()); // Middleware para procesar JSON

// Función para obtener usuarios del localStorage
function getUsers() {
    const usersString = localStorage.getItem('users');
    return usersString ? JSON.parse(usersString) : [];
}

// Función para guardar usuarios en localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function generateToken(email) {
    return jwt.sign({ email }, 'secret', { expiresIn: '1h' });
}

app.post('/register', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: 'Email y contraseña son requeridos'
        });
    }

    const users = getUsers();
    
    // Verificar si el usuario ya existe
    if (users.some(user => user.email === email)) {
        return res.status(400).json({
            error: 'El email ya está registrado'
        });
    }

    // Agregar nuevo usuario
    users.push({ email, password });
    saveUsers(users);

    const token = generateToken(email);
    res.status(201).json({
        mensaje: 'Usuario registrado exitosamente',
        token
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ 
            error: 'Email y contraseña son requeridos' 
        });
    }

    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (!user || user.password !== password) {
        return res.status(401).json({ 
            error: 'Email o contraseña incorrectos' 
        });
    }

    try {
        const token = generateToken(email);
        res.json({ 
            token,
            mensaje: 'Inicio de sesión exitoso'
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Error al generar el token' 
        });
    }
});

app.listen(8080, () => console.log('API is running on http://localhost:8080'));
