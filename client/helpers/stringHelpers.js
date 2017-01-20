Template.registerHelper('truncate', function(string, length) {
  var cleanString = _(string).stripTags();
  return _(cleanString).truncate(length);
});
Template.registerHelper('printDate', function(date){
  return moment.utc(date).format("dddd, MMMM Do YYYY, H:mm");
});
Template.registerHelper('printDateFromNow', function(date){
  return moment.utc(date).isSame(moment(),'day')?'Today':moment(date).calendar();
});
