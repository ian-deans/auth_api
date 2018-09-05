var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

/* GET users listing. */
router.get('/', async function(req, res, next) {

  let users = await User.find().exec().catch(next)


  res.json( users.map( user => user.toJSON() ) );
});

router.post( '/', async function(req, res, next) {
  const newUserData = req.body;

  if ( !newUserData.name ) {
    return res.send(422).json({
      error: {
        name: 'was not provided and is required.'
      }
    })
  }

  if ( !newUserData.facebookId ) {
    return res.status(422).json({
      error: {
        facebookId: 'was not provided and is required.'
      }
    })
  }

  const newUser = new User( newUserData );

  const savedUser = await newUser.save().catch(next)

  return res.status(200).json( savedUser.toJSON() );

} );

module.exports = router;
