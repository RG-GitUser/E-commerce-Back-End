const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  Product.findAll({
    include: [
      Category,
      {
        model: Tag,
        through: ProductTag,
      },
    ],
  })
    .then((products) =>{
      console.log('inside products', products)
    }) .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one product

router.get('/:id', async (req, res) => {   // here we are sending a GET request 
  try {
    const product = await Product.findByPk(req.params.id, {  // setting id as a param
      include: [    
        {
          model: Category,
          attributes: ['id', 'category_name'],
        },                                          // looking up product in database 
        {
          model: Tag,
          attributes: ['id', 'tag_name'],
        }
      ],
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' }); // if not found produce error message
    }

    res.json(product);
  } catch (error) {
    console.error(error);                                                 // if found return product information 
    res.status(500).json({ error: 'Failed to retrieve product' });
  }  // send a 500 internal server error with error message 
});

// create new product
router.post('/', (req, res) => {

// creating product basketball 
  Product.create({
    product_name: "Basketball",
    price: 20.00,
    stock: 3,
    tagIds: [35, 53]
  })
    .then(product => {
      res.json(product);
    })
    .catch(err => {
      res.status(500).json(error.message);
    });

    // creating product Gravy Boat
  Product.create({
    product_name: "Gravy Boat",
    price: 35000.00,
    stock: 1,
    tagIds: [15, 13]
  })
    .then(product => {
      res.json(product);
    })
    .catch(err => {
      res.status(500).json(error.message);
    });

    // creating product hamster 

    Product.create({
      product_name: "Hamster",
      price: 550.00,
      stock: 10,
      tagIds: [20, 4]
    })
      .then(product => {
        res.json(product);
      })
      .catch(err => {
        res.status(500).json(error.message);
      });
  
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {

        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
});

module.exports = router;
