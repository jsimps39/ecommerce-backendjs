const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findAll();
    res.json(categoryData);
} catch (err) {
    console.log(err);
    res.json(err);
}
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product,
      through: Trip
      }]
    });
    res.json(categoryData);
} catch (err) {
    console.log(err);
    res.json(err);
}
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const categoryData = await Category.create(req.body);
    res.json(categoryData);
} catch (err) {
    console.log(err);
    res.json(err);
}
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      // All the fields you can update and the data attached to the request body.
      id: req.body.id,
      category_name: req.body.category_name,
    },
    {
      // Gets the books based on the isbn given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      // Sends the updated book as a json response
      res.json(updatedCategory);
    })
    .catch((err) => res.json(err));
});

// Delete route for a book with a matching isbn
router.delete('/:isbn', (req, res) => {
  // Looks for the books based on isbn given in the request parameters and deletes the instance from the database
  Book.destroy({
    where: {
      isbn: req.params.isbn,
    },
  })
    .then((deletedBook) => {
      res.json(deletedBook);
    })
    .catch((err) => res.json(err));
});

// Delete route for a book with a matching isbn
router.delete('/:isbn', (req, res) => {
  // Looks for the books based on isbn given in the request parameters and deletes the instance from the database
  Book.destroy({
    where: {
      isbn: req.params.isbn,
    },
  })
    .then((deletedBook) => {
      res.json(deletedBook);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const categoryData = await Category.destroy({where: {id: req.params.id}});
    res.json(categoryData);
} catch (err) {
    console.log(err);
    res.json(err);
}
});

module.exports = router;
