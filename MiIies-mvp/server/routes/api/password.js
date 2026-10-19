const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Password = require('../../models/Password');

router.post(
  '/',
  check('value', 'Empty value is not allowed').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const password = new Password({
        value: "Rock"
      });

      const ppassword = await password.save();
      res.json(ppassword);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/', async (req, res) => {
  try {
    const passwords = await Password.find().sort({ date: -1 });
    if(passwords.length){
      res.json({
        status: 'success',
        password: passwords[0]
    });
    }
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route     PUT api/faqs
//@desc      Put a faq
//@access    Private
router.put('/:id', async(req, res) => {
  try {
   
    await Password.findOneAndUpdate({_id: req.params.id}, {value: req.body.value}, {upsert: true}, function(err, doc) {
      if (err) return res.send(500, {error: err});
      return res.json({
        status: "Success"
      });
  });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
