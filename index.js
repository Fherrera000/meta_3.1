const express = require('express');
const app = express();
const estudiantes = require('./estudiantes'); 
const port = 4000;


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Acceder al API /estudiantes');
});


app.get('/estudiantes', (req, res) => {
    let registros = estudiantes.findAll();
    res.status(200).json(registros);
});


app.get('/estudiantes/:id', (req, res) => {
    let registro = estudiantes.findById(req.params.id);
    if (registro) {
        res.status(200).json(registro);
    } else {
        res.status(404).json({
            type: "error",
            msg: "Id no encontrado"
        });
    }
});


app.post('/estudiantes', (req, res) => {
    const nuevoEstudiante = {
        id: req.body.id,
        nombre: req.body.nombre,
        matricula: req.body.matricula,
        semestreIngreso: req.body.semestreIngreso,
        creditosCursados: req.body.creditosCursados
    };

    const agregado = estudiantes.add(nuevoEstudiante);
    res.status(200).json(agregado);
});


app.put('/estudiantes/:id', (req, res) => {
    let resultado = estudiantes.save(req.params.id, req.body);
    if (resultado) {
        res.status(200).json(resultado);
    } else {
        res.status(404).json({ error: 'Id no encontrado' });
    }
});


app.patch('/estudiantes/:id', (req, res) => {
    let resultado = estudiantes.save(req.params.id, req.body);
    if (resultado) {
        res.status(200).json(resultado);
    } else {
        res.status(404).json({ error: 'Id no encontrado' });
    }
});


app.delete('/estudiantes/:id', (req, res) => {
    let resultado = estudiantes.save(req.params.id, req.body);
    if(resultado){
        res.status(200).send('Borrando los datos del estudiante ' + req.params.id);
    }else{
        
    }
    
});


app.listen(port, () => {
    console.log('Servidor escuchando por el puerto:', port);
}).on('error', err => {
    console.log('Error al iniciar el servidor:', err);
});