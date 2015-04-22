Meteor.publish("categories",function(){
   return Categories.find({});
});