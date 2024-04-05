const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');

// Middleware para procesar datos del cuerpo de las solicitudes HTTP
app.use(bodyParser.urlencoded({ extended: true }));

// Directorio de archivos estáticos
app.use(express.static(__dirname + '/public'));

// Ruta de inicio de sesión
app.get('/', (req, res) => {
    res.render('login');
});

// Ruta de matriculas
app.post('/matriculas', (req, res) => {
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;

    // Lógica para verificar el inicio de sesión y redireccionar a la vista de matriculas
    // Aquí puedes implementar la lógica de autenticación con la base de datos o cualquier otro método
    // Si la autenticación es exitosa, redirecciona a la vista de matriculas
    if (usuario === 'usuario' && contrasena === 'contrasena') {
        res.render('matriculas');
    } else {
        // Si la autenticación falla, puedes renderizar una vista de error o redireccionar a otra página
        res.render('login', { error: 'Usuario o contraseña incorrectos' });
    }
});

// Ruta de confirmacion de matriculas
app.post('/confirmacion', (req, res) => {
    const curso = req.body.curso;
    const medioPago = req.body.medioPago;
    const modulos = req.body.modulo || []; // Asegúrate de que modulos esté siendo enviado desde el formulario
    
    let precioPorModulo;
    switch (curso) {
        case 'Java':
            precioPorModulo = 1200; // Cada módulo de Java cuesta S/ 1200
            break;
        case 'PHP':
            precioPorModulo = 800; // Cada módulo de PHP cuesta S/ 800
            break;
        case '.NET':
            precioPorModulo = 1500; // Cada módulo de .NET cuesta S/ 1500
            break;
    }

    // Calcular el total sin descuento
    let totalSinDescuento = modulos.length * precioPorModulo;

    // Calcular el total con descuento si se paga en efectivo
    let totalConDescuento = totalSinDescuento;
    if (medioPago === 'Pago en efectivo') {
        // Aplicar descuento del 10% a cada módulo
        totalConDescuento = modulos.length * (precioPorModulo * 0.9);
    }
    // Lógica para calcular el pago final sumando los totales con descuento de cada módulo
    let pagoFinal = totalConDescuento;

    // Lógica para procesar los datos y mostrar la vista de confirmación
    res.render('confirmacion', { curso, medioPago, modulos, totalSinDescuento, totalConDescuento, precioPorModulo, pagoFinal  });
});
// Puerto en el que el servidor escucha las solicitudes
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});