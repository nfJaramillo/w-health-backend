//const User = require('../models/user');
const { getDbRef } = require('../../lib/mongo');
const COLLECTION_NAME = 'users';

const getAllUsers = async () => {
  try {
    const users = await getDbRef()
      .collection(COLLECTION_NAME)
      .find({})
      .toArray();
    return { users };
  } catch (error) {
    return { error };
  }
};

const getAllUsersByCorporation = async (corpo) => {
  try {
    const users = await getDbRef()
      .collection(COLLECTION_NAME)
      .find({coorporation: corpo, isSupervisor: 'no'})
      .toArray();
    return { users };
  } catch (error) {
    return { error };
  }
};


async function getUserByEmail(pEmail) {
  try {
    const user = await getDbRef()
      .collection(COLLECTION_NAME)
      .findOne({ email: pEmail });
    return user;
  } catch (error) {
    return { error };
  }
}

function register(matchDocument, res){
   getDbRef()
    .collection(COLLECTION_NAME)
    .insertOne(matchDocument, function (err, result) {
      if (err) {
        res.status(400).send("Error inserting matches!");
      } else {
        console.log(`Added a new match with id ${result.insertedId}`);
        res.status(204).send();
      }
    });
}

function updateSurveys(pEmail, res){
  getDbRef()
   .collection(COLLECTION_NAME)
   .updateOne({email: pEmail}, {$set: {lastSurvey: new Date(Date.now()).toISOString()}}, function (err, result) {
     if (err) {
       res.status(400).send("Error inserting matches!");
     } else {
       res.status(204).send();
     }
   });
}

function updateActiveBreak(pEmail, res){
  getDbRef()
   .collection(COLLECTION_NAME)
   .updateOne({email: pEmail}, {$set: {lastActiveBreak: new Date(Date.now()).toISOString()}}, function (err, result) {
     if (err) {
       res.status(400).send("Error inserting matches!");
     } else {
       console.log(`Added a new match with id ${result.insertedId}`);
       res.status(204).send();
     }
   });
}

   function updatePersonalizedExcercise(pEmail, res){
    getDbRef()
     .collection(COLLECTION_NAME)
     .updateOne({email: pEmail}, {$set: {lastP_Exercise: new Date(Date.now()).toISOString()}}, function (err, result) {
       if (err) {
         res.status(400).send("Error inserting matches!");
       } else {
         console.log(`Added a new match with id ${result.insertedId}`);
         res.status(204).send();
       }
     });
    }

     function updateEHealthSurvey(pEmail, res){
      getDbRef()
       .collection(COLLECTION_NAME)
       .updateOne({email: pEmail}, {$set: {lastE_Survey: new Date(Date.now()).toISOString()}}, function (err, result) {
         if (err) {
           res.status(400).send("Error inserting matches!");
         } else {
           console.log(`Added a new match with id ${result.insertedId}`);
           res.status(204).send();
         }
       });
      }

module.exports = { getAllUsers, getUserByEmail, register, getAllUsersByCorporation,updateSurveys,updateActiveBreak,updatePersonalizedExcercise,updateEHealthSurvey };
