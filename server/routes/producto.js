const express = require('express');

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let app = express();

const Producto = require('../models/producto');

app.post('/producto', verificaToken, (req, res) => {
	let body = req.body;

	let producto = new Producto({
		nombre: body.nombre,
		precioUni: body.precioUni,
		descripcion: body.descripcion,
		disponible: body.disponible,
		categoria: body.categoria,
		usuario: req.usuario._id
	});

	producto.save( (err, productoDB) => {
		
		if (err) {
		  return res.status(500).json({
		    ok: false,
		    err
		  });
		}

		if (!productoDB) {
		  return res.status(400).json({
		    ok: false,
		    err
		  });
		}

		res.json({
			ok: true,
			producto: productoDB
		})


	});

});

app.put('/producto/:id', verificaToken, (req, res) => {
	let id = req.params.id;
	let body = req.body;

	Producto.findOneAndUpdate(id, body, {new: true, runValidators: true}, (err, productoDB) => {

		if (err) {
		  return res.status(500).json({
		    ok: false,
		    err
		  });
		}

		if (!productoDB) {
		  return res.status(400).json({
		    ok: false,
		    err: {
		    	message: 'El producto no existe'
		    }
		  });
		}

		res.json({
			ok: true,
			categoria: productoDB
		})

	});

});

// Get Productos
app.get('/producto', verificaToken, (req, res) => {

  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);

  Producto.find({disponible: true})
  	.skip(desde)
  	.limit(limite)
  	.populate('usuario', 'nombre email')
  	.populate('categoria', 'descripcion')
	.exec( (err, productos) => {

		if (err) {
		  return res.status(500).json({
		    ok: false,
		    err
		  });
		}

		if (!productos) {
		  return res.status(400).json({
		    ok: false,
		    err
		  });
		}

		res.json({
			ok: true,
			productos
		})

	});

});

// Get por id
app.get('/producto/:id', verificaToken, (req, res) => {

	let id = req.params.id;	

	Producto.findById(id)
			.populate('usuario', 'nombre email')
			.populate('categoria', 'descripcion')
			.exec((err, productoDB) => {

		if (err) {
		  return res.status(500).json({
		    ok: false,
		    err
		  });
		}

		if (!productoDB) {
		  return res.status(400).json({
		    ok: false,
		    err: {
		    	message: 'El ID no es correcto'
		    }
		  });
		}

		res.json({
			ok: true,
			producto: productoDB
		})

	});

});

app.delete('/producto/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
	let id = req.params.id;

	Producto.findById(id, (err, productoDB) => {

		if (err) {
		  return res.status(500).json({
		    ok: false,
		    err
		  });
		}

		if (!productoDB) {
		  return res.status(400).json({
		    ok: false,
		    err: {
		    	message: 'El ID no existe'
		    }
		  });
		}

		productoDB.disponible = false;

		productoDB.save( (err, productoBorrado) => {
			
			if (err) {
			  return res.status(500).json({
			    ok: false,
			    err
			  });
			}

			res.json({
				ok: true,
				message: 'Producto borrado'
			})			

		});


	});

});

// Buscar productos
app.get('/producto/buscar/:termino', verificaToken, (req, res) => {
	
	let termino = req.params.termino;

	let regex = new RegExp(termino, 'i');

	Producto.find({nombre: regex})
			.populate('usuario', 'nombre email')
			.populate('categoria', 'descripcion')
			.exec( (err, productosDB) => {
				if (err) {
					return res.status(500).json({
						ok: false,
						err
					});
				}

				res.json({
					ok: true,
					productos: productosDB
				})	
			});

});

module.exports = app;