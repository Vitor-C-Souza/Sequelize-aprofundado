const database = require('../models')
const Sequelize = require('sequelize')

const { pessoaServices, MatriculasServices } = require('../services')
const pessoasServices = new pessoaServices()
const matriculaServices = new MatriculasServices()

class PessoaController{
    static async PegaPessoasAtivas(req,res){
        try
        {
            const PessoasAtivas = await pessoasServices.pegaTodosOsRegistrosAtivos()
            return res.status(200).json(PessoasAtivas)
        }
        catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async PegaTodasAsPessoas(req,res){
        try
        {
            const TodasAsPessoas = await pessoasServices.pegaTodosOsRegistros()
            return res.status(200).json(TodasAsPessoas)
        }
        catch(error){
            return res.status(500).json(error.message)
        }
    }
    

    static async pegaUmaPessoa(req,res){
        const { id } = req.params

        try{
            const UmaPessoa = await pessoasServices.pegaUmRegistro(id)
            return res.status(200).json(UmaPessoa)
        }catch (error) {
            return res.status(500).json(error.message)
        }
    }
    
    static async CriarPessoa(req,res){
        const NovaPessoa = req.body
        try{
            const NovaPessoaCriada = await pessoasServices.criaRegistro(NovaPessoa)

            return res.status(200).json(NovaPessoaCriada)

        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async AtualizarPessoa(req,res){
        const { id } = req.params
        const NovaInfo = req.body

        try{ 
            const PessoaAtualizada = await pessoasServices.atualizaRegistro(id, NovaInfo)

            res.status(200).json(PessoaAtualizada)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async ExcluiPessoa(req, res){
        const { id } = req.params

        try{
            await pessoasServices.apagaRegistro(id)

            return res.status(200).json({message: `id ${id} foi deletado`})
        }catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async restauraPessoa(req, res){
        const { id } = req.params
        try{
            await pessoasServices.restauraRegistro(id)
            return res.status(200).json( { message: `id ${id} restaurado`})
        }catch(error){
            return res.status(500).json(error.message)
        }
    }

    //Matriculas
    static async pegaUmaMatricula(req,res){
        const { estudanteId, matriculaId } = req.params

        try{
            const UmaMatricula = await matriculaServices.pegaUmRegistro( estudanteId, matriculaId)

            return res.status(200).json(UmaMatricula)
        }catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async CriarMatricula(req,res){
        const { estudanteId } = req.params
        const info = { ...req.body, estudante_id: Number(estudanteId) }
        
        try{
            const NovaMatriculaCriada = await matriculaServices.criaRegistro(info)

            return res.status(200).json(NovaMatriculaCriada)

        }catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async AtualizarMatricula(req,res){
        const { estudanteId, matriculaId } = req.params
        const NovasInfos = req.body

        try{   

            await matriculaServices.atualizaRegistro( NovasInfos, matriculaId, estudanteId )

            const dadoAtualizado = await matriculaServices.pegaUmRegistro( estudanteId, matriculaId)
            res.status(200).json(dadoAtualizado)

        }catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async ExcluiMatricula(req, res){
        const { estudanteId, matriculaId } = req.params

        try{
            await matriculaServices.apagaRegistro(matriculaId, estudanteId)

            return res.status(200).json({message: `id ${matriculaId} foi deletado`})
        }catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async PegaMatriculas(req, res){
        const { estudanteId } = req.params

        try{
            const pessoa = await database.Pessoas.findOne(
                {where:
                     {
                        id: Number(estudanteId)
                    }})
            const matriculas = await pessoa.getAulasMatriculadas()

            return res.status(200).json(matriculas)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async PegaMatriculasPorTurma(req, res){
        const { turmaId } = req.params

        try{
            const pegaAsMatriculas = await matriculaServices.pegaEConteRegistros(turmaId)                
           

            return res.status(200).json(pegaAsMatriculas)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async PegaTurmasLotadas(req, res){
        const lotacaoTurma = 2

        try{
            const turmasLotadas = await matriculaServices.encontraEContaRegistros(
                { status: 'confirmado' },
          { 
            attributes: ['turma_id'],
            group: ['turma_id'],
            having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
          })
           

            return res.status(200).json(turmasLotadas)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }


    static async cancelaPessoa(req, res){
        const { estudanteId} = req.params

        try{
            await pessoasServices.cancelaPessoaEMatricula(Number(estudanteId))

            return res.status(200).json({message: `A matricula ref. estudante ${estudanteId} canceladas`})
 
        }catch(error){  
            return res.status(500).json(error.message)
        }
    }
    
}

module.exports = PessoaController