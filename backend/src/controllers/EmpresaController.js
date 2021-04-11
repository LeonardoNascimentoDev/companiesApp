const validation = require('../validation/empresa');
const Validator = require('validatorjs');
const S3 = require('../infra/s3');

const Empresa = require('../models/Empresa');

exports.store = async (request, response, next) => {
	try {
		const rules = validation.rules;
		const validationFields = new Validator(request.body, rules);
		if (validationFields.fails()) {
			return response.status(400).json({ erros: validationFields.errors.all() });
		}

		const formato = request.body.logo.substring(
			request.body.logo.indexOf(':') + 1,
			request.body.logo.indexOf(';base64'),
		);
		//Envia as logos das empresas para o aws s3
		const s3 = new S3();
		const keyName = request.body.nome + '_' + new Date().getTime();
		const base64result = request.body.logo.substr(request.body.logo.indexOf(',') + 1);
		const buff = Buffer.from(base64result, 'base64');

		const params = {
			Bucket: process.env.BUCKET_NAME,
			Body: buff,
			Key: `logos/${keyName}​​​​​​​​`,
			ContentType: formato,
		};
		await s3.putObject(params);
		//Caso queira fazer download da imagem fica disponível com esse método
		const imagem = await getSignUrl(params.Key);
		const { nome, cnpj, valor_monetario, faturamento_anual, sobre, logo } = request.body;
		empresa = await Empresa.create({
			nome,
			cnpj,
			valor_monetario,
			faturamento_anual,
			sobre,
			logo,
		});

		return response.status(200).json(empresa);
	} catch (erro) {
		return response.status(500).json({ Erro: `Erro ao buscar empresa!: ${erro}.` });
	}
};

exports.show = async (request, response, next) => {
	try {
		const empresa = await Empresa.findOne({ nome: request.params.id });
		return response.status(200).json(empresa);
	} catch (erro) {
		return response.status(500).json({ Erro: `Erro ao buscar empresa!: ${erro}.` });
	}
};

exports.search = async (request, response, next) => {
	try {
		const empresa = await Empresa.findOne({ nome: request.params.search });
		return response.status(200).json(empresa);
	} catch (erro) {
		return response.status(500).json({ Erro: `Erro ao buscar empresa!: ${erro}.` });
	}
};

exports.index = async (request, response, next) => {
	try {
		const empresas = await Empresa.find();
		return response.status(200).json(empresas);
	} catch (erro) {
		return response.status(500).json({ Erro: `Erro ao buscar empresa!: ${erro}.` });
	}
};

exports.update = async (request, response, next) => {
	try {
		// Validacao da request
		const rules = validation.rules;
		const validationFields = new Validator(request.body, rules);
		if (validationFields.fails()) {
			return response.status(400).json({ erros: validationFields.errors.all() });
		}
		const empresaNew = await Empresa.findOne({ _id: request.params.id });
		empresaNew.nome = request.body.nome;
		empresaNew.cnpj = request.body.cnpj;
		empresaNew.valor_monetario = request.body.valor_monetario;
		empresaNew.faturamento_anual = request.body.faturamento_anual;
		empresaNew.sobre = request.body.sobre;

		//Atualizando a empresa
		await Empresa.updateOne({ _id: request.params.id }, empresaNew);
		return response.json(empresaNew);
	} catch (erro) {
		return response.status(500).json({ Erro: `Erro editar a empresa!: ${erro}.` });
	}
};

exports.delete = async (request, response, next) => {
	try {
		const empresa = await Empresa.findOneAndDelete({ nome: request.params.id });
		return response.json(empresa);
	} catch (erro) {
		return response.status(500).json({ Erro: `Erro deletar empresa!: ${erro}.` });
	}
};

exports.paginacao = async (request, response, next) => {
	try {
		let page = request.body.page;
		let limit = 25;
		let skip = limit * (page - 1);
		const empresas = await Empresa.find().skip(skip).limit(limit).sort('-updatedAt');

		return response.status(200).json(empresas);
	} catch (erro) {
		return response.status(500).json({ Erro: `Erro ao buscar empresa!: ${erro}.` });
	}
};

async function getSignUrl(filepath) {
	try {
		const params = {
			Bucket: process.env.BUCKET_NAME, //Bucket do env
			Key: filepath, // Nome do arquivo do GDV
			Expires: 3600 * 5, // Tempo que o token está valido
		};

		// console.log('=======Get sign url params===========');
		// console.log(JSON.stringify(params));

		const s3 = new S3();
		const url = await s3.getSignedUrl(params); // Devolver essa url pro front ou quem precisar
		// console.log(url);
		return url;
	} catch (error) {
		return res.status(500).json({ Erro: `Ocorreu um erro ao gerar o download dos anexos!: ${erro}.` });
	}
}
