import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
const app = express();

app.use(cors());
app.use(express.json()); // Middleware para procesar JSON

function generateToken(email) {
    const token = jwt.sign({email}, 'secret');
    return token;
}

app.post('/login', (req, res) => {
    // Verificar si existe email en el body
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ error: 'Email es requerido' });
    }

    try {
        const token = generateToken(email);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error al generar el token' });
    }
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));
