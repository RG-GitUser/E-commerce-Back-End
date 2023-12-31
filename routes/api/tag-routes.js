const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// retrieving all tags

router.get('/', async (req, res) => {
  try {                           
    const tags = await Tag.findAll({
      include: [             //specifying what we want to include from the Product model
        {
          model: Product, 
          attributes: ['id', 'product_name'],    // including the id, and product_name attributes from the product model
        },
      ],
    });

    res.json(tags);
  } catch (error) { //errors are caught here from if any are found in the db 
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve tags' }); // sending 500 internal server error response with error message 
  }
});

//finding a single tag by its id 
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, { //finding by primary key
      include: [{ model: Product }],  // including associated prodcut data
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id' }); // 404 status returned if not found
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {             // status 200 code is given for a successful response
    res.status(500).json(error.message); // internal server error
  }
});


// creating new tag 
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(201).json(tagData); // sucessful tag creation 
  } catch (err) {
    res.status(500).json(error.message); // unsuccessful tag creation with error msg 
  }
});

router.put('/:id', async (req, res) => { // PUT route param id to find tags
  try {
    const tagData = await Tag.findByPk(req.params.id); //find by primary key

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id' }); //error messsage returned if no tag found
      return;
    }
    await tagData.update({ name: req.body.name }); 

    res.status(200).json(tagData); 
  } catch (err) {
    res.status(500).json(error.message);
  }
});


// deleting a tag by id 
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id);

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    // Perform the deletion logic here (add code to impliment delete tag function)
    await tagData.destroy();

    res.status(204).end(); //success message
  } catch (err) {
    res.status(error.message).json(err); //error message
  }
});
module.exports = router;
