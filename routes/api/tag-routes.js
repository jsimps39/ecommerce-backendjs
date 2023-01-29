const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagData = await Category.findAll();
    res.json(tagData);
} catch (err) {
    console.log(err);
    res.json(err);
}
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagData = await Category.findByPk(req.params.id, {
      include: [{model: Product,
      through: Trip
      }]
    });
    res.json(tagData);
} catch (err) {
    console.log(err);
    res.json(err);
}
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const tagData = await Category.create(req.body);
    res.json(tagData);
} catch (err) {
    console.log(err);
    res.json(err);
}
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      // All the fields you can update and the data attached to the request body.
      id: req.body.id,
      tag_name: req.body.tag_name,
    },
    {
      // Gets the books based on the isbn given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedTag) => {
      // Sends the updated book as a json response
      res.json(updatedTag);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const tagData = await Tag.destroy({where: {id: req.params.id}});
    res.json(tagData);
} catch (err) {
    console.log(err);
    res.json(err);
}
});

module.exports = router;
