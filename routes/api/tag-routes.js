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
    res.status(500).json(err); // internal server error
  }
});


// creating new tag 
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(201).json(tagData); // sucessful tag creation 
  } catch (err) {
    res.status(500).json(err); // unsuccessful tag creation with error msg 
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
