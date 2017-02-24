Meteor.methods({
  'Categories.insert': function (params) {
    Categories.insert(params);
  },
  'Categories.approveToggle': function(categoryId) {

    var category = Categories.find({_id: categoryId}).fetch()[0];

    category['approved'] = !category.approved;

    Categories.update({_id: category._id}, {'$set': category}, {validate: false});
  }
});
