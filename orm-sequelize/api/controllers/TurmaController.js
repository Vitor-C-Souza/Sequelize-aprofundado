const Sequelize = require('sequelize')
const database = require('../models')
const Op = Sequelize.Op

const { turmasServices } = require('../services')
const turmaServices = new turmasServices()


class TurmaController {

    static async pegaTodasAsTurmas(req, res) {
        const { data_inicial, data_final } = req.query
        const where = {}  
        data_inicial || data_final ? where.data_inicio = {} : null
        data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
        data_final ? where.data_inicial[Op.lte] = data_final : null   

        try {

            const todasAsTurmas = await turmaServices.pegaTodosOsRegistros(where)
            return res.status(200).json(todasAsTurmas)

        } catch (error) {

        return res.status(500).json(error.message);

        }
    }

    static async pegaUmaTurma(req, res) {
        const { id } = req.params

        try{
            const PegaUm = await turmaServices.pegaUmRegistro(id)
            return res.status(200).json(PegaUm)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async criaTurma(req, res){
        const NovaTurma = req.body

        try{
            const TurmaCriada = await turmaServices.criaRegistro(NovaTurma)
            return res.status(200).json(TurmaCriada)
        }catch(error){
            return res.status(500).json(error.message) 
        }
    }

    static async atualizaTurma(req, res){
        const NovaInfo = req.body
        const { id } = req.params

        try{
            await turmaServices.atualizaRegistro(NovaInfo, id)

            const TurmaAtualizada = await turmaServices.pegaUmRegistro(id)

            return res.status(200).json(TurmaAtualizada)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async apagaTurma(req,res){
        const { id } = req.params

        try{
            await turmaServices.apagaRegistro(id)

            return res.status(200).json(`id ${id} foi deletado`)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
}

module.exports = TurmaController