const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router.get('/pessoas/ativas', PessoaController.PegaPessoasAtivas)
router.get('/pessoas/', PessoaController.PegaTodasAsPessoas)
router.get('/pessoas/:id', PessoaController.pegaUmaPessoa)
router.post('/pessoas/', PessoaController.CriarPessoa)
router.put('/pessoas/:id', PessoaController.AtualizarPessoa)
router.delete('/pessoas/:id', PessoaController.ExcluiPessoa)
router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
router.post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa)

router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.pegaUmaMatricula)
router.post('/pessoas/:estudanteId/matricula/', PessoaController.CriarMatricula)
router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.AtualizarMatricula)
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.ExcluiMatricula)
router.get('/pessoas/:estudanteId/matricula/', PessoaController.PegaMatriculas)
router.get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.PegaMatriculasPorTurma)
router.get('/pessoas/matricula/lotada', PessoaController.PegaTurmasLotadas)

module.exports = router