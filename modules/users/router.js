var express = require('express');
var router = express.Router();
const { getAllUsers, register, getUserByEmail, getAllUsersByCorporation, updateSurveys, updateActiveBreak, updatePersonalizedExcercise, updateEHealthSurvey } = require('./controller');
const bcrypt = require ('bcrypt');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const users = await getAllUsers();
  res.json(users);
});

/* GET user. */
router.get('/:email/:psw', async function (req, res, next) {
  const users = await getUserByEmail(req.params.email);

  if(users == null)
  {
    res.json();
  }
  else{
    bcrypt.compare(req.params.psw, users.password, function(err, result) {
      if (result) {
        res.json(users);
      }
      else {
        res.json();
      }
    });
  }
});

/* GET users on corporation. */
router.get('/:corpo', async function (req, res, next) {
  const users = await getAllUsersByCorporation(req.params.corpo);


  if(users.users[0] == undefined){
    res.json();

  }
  else{
    res.json(users);

  }
});


/**
 * POST create user
 */
 router.post('/', async function (req, res) {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    const matchDocument = {
      name: req.body.name,
      email: req.body.email,
      password : hash,
      coorporation: req.body.corporation,
      isSupervisor: req.body.isSupervisor,
      lastSurvey: req.body.lastSurvey,
      lastActiveBreak: req.body.lastActiveBreak,
      lastP_Exercise: req.body.lastP_Exercise,
      lastE_Survey: req.body.lastE_Survey
    };
    register(matchDocument, res);
  });
});

/* Update supervisor check survey ammount */
router.post('/lastSurvey/:email', async function (req, res, next) {
  const users = await updateSurveys(req.params.email, res);
});

/* Update employee active break count */
router.post('/lastActiveBreak/:email', async function (req, res, next) {
  const users = await updateActiveBreak(req.params.email, res);
});

/* Update employee presonalized excercise count */
router.post('/lastP_Exercise/:email', async function (req, res, next) {
  const users = await updatePersonalizedExcercise(req.params.email, res);
});

/* Update employee health survey count */
router.post('/lastE_Survey/:email', async function (req, res, next) {
  const users = await updateEHealthSurvey(req.params.email, res);
});




module.exports = router;
