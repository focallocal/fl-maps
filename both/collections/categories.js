Categories = new Mongo.Collection("categories");

Categories.attachSchema(new SimpleSchema({
	'name': {
		type: String
	},
	'color': {
		type: String
		max: 7,
		min: 7
	}
});
