const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: ['tag_id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: ['product_id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  }).then((tagData) => {
    res.json(tagData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      tag_id: req.params.id
    },

    attributes: ['tag_id', 'tag_name'],
    include: [{
      model: Product,
      attributes: ['product_id', 'product_name', 'price', 'stock', 'category_id']
    }
    ]

  }).then((tagData)=> {
    if (tagData === null ) {
      res.status(404).send("Tag Not Found")
      return;
    }
  res.json(tagData)
}).catch((err) => {
console.log(err);
res.status(500).json(err);
})
});


// this .post definitely needs testing

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((newTag) => {
    res.json(newTag);
  }).catch((err) =>{
    res.json(err);
  } );
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    where: {
      id: req.params.id
    }
  }).then((tagData) => {
    if (tagData === null ) {
      res.status(404).send("Tag not found")
      return;
    }
    res.json(tagData)
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
    })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
// ch13 excercise 7 for reference

Tag.destroy({
  where: {
    id: req.params.id
  },
}).then((tagData) => { 
  if (tagData === null ) {
  res.status(404).send("Tag not found")
  return;
  }
  res.json(tagData);
}). catch ((err) => {
  console.log(err);
    res.status(500).json(err);
})

});

module.exports = router;
