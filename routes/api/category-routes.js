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
    if (!category_name) {
      return res.status(400).json({ error: 'Category name is required '});
    }

    const newCategory = await Category.create({ category_name });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error '});
  }
});


router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
