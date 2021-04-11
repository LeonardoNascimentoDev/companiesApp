const axios = require('axios');

module.exports = {
	async logar(request, response) {
		try {
			if (request.body.usuario == 'admin' && request.body.senha == 'admin') {
				return response.status(200).json('Usuário autenticado com sucesso!');
			} else {
				return response.status(500).json('Usuário não cadastrado na plataforma!');
			}
		} catch (erro) {
			return res.status(500).json({ Erro: `Erro ao autenticar usuário!: ${erro}.` });
		}
	},
};
