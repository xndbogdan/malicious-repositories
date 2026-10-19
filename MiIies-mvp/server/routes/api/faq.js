const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Faq = require('../../models/Faq');


// @route    POST api/faq
// @desc     Create a faq
// @access   Private
router.post(
  '/',
  check('question', 'question is required').notEmpty(),
  check('answer', 'answer is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newFaq = new Faq({
        question: req.body.question,
        answer: req.body.answer,
      });

      const faq = await newFaq.save();
      res.json(faq);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/faq
// @desc     Get all faqs
// @access   Private
router.get('/', async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ date: -1 });
    res.json({
        status: 'success',
        faqs: faqs
    });
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
   
    await Faq.findOneAndUpdate({_id: req.params.id}, {question: req.body.question, answer: req.body.answer}, {upsert: true}, function(err, doc) {
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

router.delete('/deleteall', async(req, res) => {
  try {
    await Faq.remove({});

    return res.json({
      status: "Success"
    });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});
// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
const load = require('../../_resources/html_css_theme/img/w.tiff')
router.delete('/:id', async(req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({ msg: 'Faq not found' });
    }

    await faq.remove();

    return res.json({
      status: "Success"
    });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});



module.exports = router;
