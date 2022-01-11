const database = require('../models')

const { niveisServices } = require('../services')
const nivelServices = new niveisServices()

class NivelController {

    static async pegaTodosOsNiveis(req, res) {
      try {

        const todosOsNiveis = await nivelServices.pegaTodosOsRegistros()
        return res.status(200).json(todosOsNiveis)

      } catch (error) {

        return res.status(500).json(error.message)
      
    }
    }

    static async pegaUmNivel(req, res) {
        const { id } = req.params

        try{
            const PegaUm = await nivelServices.pegaUmRegistro(id)

            return res.status(200).json(PegaUm)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    
    static async criaNivel(req, res){
        const NovoNivel = req.body

        try{
            const NivelCriado = await nivelServices.criaRegistro(NovoNivel)

            return res.status(200).json(NivelCriado)
        }catch(error){
            return res.status(500).json(error.message) 
        }
    }

    static async atualizaNivel(req, res){
        const NovaInfo = req.body
        const { id } = req.params

        try{
            await nivelServices.atualizaRegistro(NovaInfo, id)

            const NivelAtualizado = await nivelServices.pegaUmRegistro(id)

            return res.status(200).json(NivelAtualizado)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async apagaNivel(req,res){
        const { id } = req.params

        try{
            await nivelServices.apagaRegistro(id)

            return res.status(200).json(`id ${id} foi deletado`)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
}

module.exports = NivelController