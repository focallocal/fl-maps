Categories = new Mongo.Collection("categories");

Categories.attachSchema(new SimpleSchema({
	'name': {
		type: String,
		autoform: {
			id: 'category-name'
		}
	},
	'color': {
		type: String,
		autoform: {
			id: 'category-color',
			label: false
		}
	},
	'approved': {
		type: Boolean,
		autoform: {
			type: 'hidden',
			defaultValue: false
		},
		optional: true
	}
}));
