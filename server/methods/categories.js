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
  },
  'Categories.setDefault': function(categoryId) {
    if (Roles.userIsInRole(this.userId, ["admin"])) {
      var category = Categories.find({_id: categoryId}).fetch()[0];
      var previousDefault = Categories.find({default: true}).fetch()[0];

      if (previousDefault !== undefined) {
        if (categoryId !== previousDefault._id) {
          previousDefault['default'] = false;
          Categories.update({_id: previousDefault._id}, {'$set': previousDefault}, {validate: false});
        }
      }

      category['default'] = true;
      Categories.update({_id: category._id}, {'$set': category}, {validate: false});

      return category.name + " is now default";
    }
  }
});
