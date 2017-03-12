Meteor.methods({
  'Categories.insert': function (params) {
    if (Roles.userIsInRole(this.userId, ["admin"])) {
      Categories.insert(params);
    }
  },
  'Categories.approveToggle': function(categoryId) {
    if (Roles.userIsInRole(this.userId, ["admin"])) {
      var category = Categories.find({_id: categoryId}).fetch()[0];

      category['approved'] = !category.approved;

      Categories.update({_id: category._id}, {'$set': category}, {validate: false});
    }
  },
  'Categories.remove': function(categoryId) {
    if (Roles.userIsInRole(this.userId, ["admin"])) {
      Categories.remove({_id: categoryId});
    }
  }
});
