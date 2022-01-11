const Services = require('./Services')
const database = require('../models')

class MatriculasServices extends Services {
    constructor(){
        super('Matriculas')
    }

    async pegaUmRegistro(estudanteId,matriculaId){
        return database[this.nomeDoModelo]
            .findOne( { where: { id: Number(matriculaId), estudante_id: Number(estudanteId) }})
    }

    async criaRegistro(NovaInfo){

        return super.criaRegistro(NovaInfo)
    }

    async atualizaRegistro(NovaInfo, matriculaId, estudanteId){
        
        return super.atualizaRegistros(NovaInfo, { id: Number(matriculaId), estudante_id: Number(estudanteId) })
        
    }

    async apagaRegistro(matriculaId, estudanteId){        
        
        database[this.nomeDoModelo]
            .destroy({where:
                {  id: Number(matriculaId),
                   estudante_id: Number(estudanteId)
               }})
    }

    async pegaEConteRegistros(id){
        return database[this.nomeDoModelo]
            .findAndCountAll({
                where: {
                    turma_id: Number(id),
                    status: 'confirmado'
                }
            })
    }

    async encontraEContaRegistros(where = {}, agregadores) {
        return database[this.nomeDoModelo]
          .findAndCountAll({ where: { ...where }, ...agregadores })
    }
}

module.exports = MatriculasServices