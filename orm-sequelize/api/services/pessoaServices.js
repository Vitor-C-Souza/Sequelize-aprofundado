const Services = require('./Services')
const database = require('../models')

class PessoasServices extends Services {
    constructor(){
        super('Pessoas')
        this.Matriculas = new Services('Matriculas')
    }

    async pegaTodosOsRegistrosAtivos(where = {}) {
        return database[this.nomeDoModelo].findAll({ where: { ...where } })
    }

    async pegaTodosOsRegistros(where = {}) {
        return database[this.nomeDoModelo].scope('todos').findAll({ where: { ...where } })
    }

    async cancelaPessoaEMatricula(estudanteId){
        return database.sequelize.transaction(async transacao => {

            await super.atualizaRegistro( {ativo: false}, estudanteId, { transaction: transacao})

            await this.Matriculas.atualizaRegistros({ status: 'cancelado' }, { estudante_id: estudanteId}, {transaction: transacao})

        })
    }

    async pegaUmRegistro(id){

        return database[this.nomeDoModelo]
            .findOne( { where: {id: Number(id)}})
    }

    async atualizaRegistro(id, NovaInfo){

        await database[this.nomeDoModelo].scope('todos').update(NovaInfo, { where: { id: Number(id)}})  
            
        
        return this.pegaUmRegistro(id)

    }

    async criaRegistro(dados){
        return super.criaRegistro(dados)
    }

    async apagaRegistro(id){
        return database[this.nomeDoModelo]
            .scope('todos')
            .destroy( {where: {id: Number(id)}})
    }

    async restauraRegistro(id){
        return super.restauraRegistro(id)
    }
}

module.exports = PessoasServices