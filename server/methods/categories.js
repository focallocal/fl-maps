Meteor.methods({
  'Categories.insert': function (params) {
    Categories.insert(params);
  },
  'Categories.approveToggle': function(categoryId) {

    var category = Categories.find({_id: categoryId}).fetch()[0];

    console.log(category);

    category['approved'] = !category.approved;

    console.log(category);

    // Events.update({_id: _id}, {'$set': event}, {validate: false})

    Categories.update({_id: category._id}, {'$set': category}, {validate: false});

    console.log(Categories.find({_id: categoryId}).fetch()[0]);
  }
});
