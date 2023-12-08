const produtos = require('../bancodedados/produtos')
const { getStateFromZipcode } = require('utils-playground')

const listarProdutos = async (req, res) => {
    return res.status(200).json(produtos)
}

const obterProduto = async (req, res) => {
    try {
        const { idProduto } = req.params

        const acharProduto = produtos.find((produto) => {
            return produto.id === Number(idProduto)
        })
        if (!acharProduto) {
            return res.status(404).json({ mensagem: 'O produto não foi encontrado com ID fornecido' })
        }
        return res.status(200).json(acharProduto)
    } catch (error) {
        console.log("Erro ao obter produto:", error);
        return res.status(500).json({ mensagem: "Erro interno do servidor ao obter produto" })
    }
}

const calcularFrete = async (req, res) => {
    try {
        const { idProduto, cep } = req.params

        const acharProduto = produtos.find((produto) => {
            return produto.id === Number(idProduto)
        })
        if (!acharProduto) {
            return res.status(404).json({ mensagem: 'O produto não foi encontrado com ID fornecido' })
        }

        const estado = await getStateFromZipcode(cep)

        if (acharProduto) {
            let frete;
            if (estado === 'BA' || estado === 'SE' || estado === 'AL' || estado === 'PE' || estado === 'PB') {
                frete = acharProduto.valor * 0.1
            } else if (estado === 'SP' || estado === 'RJ') {
                frete = acharProduto.valor * 0.15
            } else {
                frete = acharProduto.valor * 0.12
            }
            const resultado = {
                produto: acharProduto,
                estado: estado,
                frete: frete
            }
            return res.status(200).json(resultado)
        }
    } catch (error) {
        console.error("Erro ao calcular frete:", error);
        return res.status(500).json({ mensagem: "Erro interno do servidor ao calcular frete" });
    }
}

module.exports = { listarProdutos, obterProduto, calcularFrete }