const Router = require('koa-router');
const router = Router();
const {CompanyController, JobController, ApplicationController, UserController} = require('../controllers');

const isAuthenticated = require('../polices/isAuthenticated');

router.post('/companies',isAuthenticated, CompanyController.create);
router.get('/companies',isAuthenticated, CompanyController.find);
router.get('/companies/:id',isAuthenticated, CompanyController.findOne);
router.delete('/companies/:id',isAuthenticated, CompanyController.destroy);
router.put('/companies/:id',isAuthenticated, CompanyController.update);

router.post('/jobs',isAuthenticated, JobController.create);
router.get('/jobs',isAuthenticated, JobController.find);

router.post('/applications',isAuthenticated, ApplicationController.create);

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);

module.exports = router;