Template.registerHelper('truncate', function(string, length) {
  var cleanString = _(string).stripTags();
  return _(cleanString).truncate(length);
});
Template.registerHelper('printDate', function(date){
  return moment(date).format("dddd, MMMM Do YYYY");
});
Template.registerHelper('printDateFromNow', function(date){
  return moment(date).isSame(moment(),'day')?'Today':moment(date).fromNow();
});