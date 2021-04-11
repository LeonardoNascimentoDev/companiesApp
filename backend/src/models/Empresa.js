const mongoose = require('mongoose');

const EmpresaSchema = new mongoose.Schema(
	{
		nome: String,
		cnpj: String,
		valor_monetario: String,
		faturamento_anual: String,
		sobre: String,
		logo: String,
	},
	{ timestamps: true, collection: 'empresa' },
);

module.exports = mongoose.model('Empresa', EmpresaSchema);
