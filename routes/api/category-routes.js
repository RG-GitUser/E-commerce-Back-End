const express = require('express');
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({ 
      include: Product,  // setting a route to find all categories 
    });
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });   // our response here will "catch" our response and return an error if our connection is unsuccessful
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId, { // trying to find category id by primary key 
      include: Product, 
    });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' }); // if not found return a 404 status
    }
    res.json(category);
  } catch (error) {             // sending category from database as a JSON response and log errors to user
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// create new category

router.post('/categories', async (req, res) => {
  try {
    const { category_name } = req.body;
    if (!category_name) { // seeing if the category_name is in the request
      return res.status(400).json({ error: 'Category name is required '});
    }
    
    // create a new category in database 

    const newCategory = await Category.create({ category_name });

    // sending a 201  response with the newly created category 
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error '});
  }
});


// Update a category by its id
router.put('/categories/:id', async (req, res) => {
  try {
    const { category_name } = req.body;
    
    const categoryId = req.params.id; //extracting category id from the URL parameter

    if (!category_name) {
      return res.status(400).json({ error: 'Category name is required' }); // check if category_name is in the request
    }
    const category = await Category.findByPk(categoryId); // finding category by it's Primary Key

    if (!category) {
      return res.status(404).json({ error: 'Category not found' }); //checking if category exists
    }

    category.category_name = category_name; 
    
    await category.save(); //saving to database 

    // Send a 200 OK response with the updated category
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;


router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
