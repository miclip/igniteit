import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  rate: DS.belongsTo('rate',{async:true}),	
  package: DS.belongsTo('package',{async:true}),	
  sessionDate: DS.attr('date'),
  organizationId: DS.attr('string'),
  trainer: DS.belongsTo('trainer', {async:true}),
  client: DS.belongsTo('client', {async:true}),
  facility: DS.belongsTo('facility', {async:true}),
  location: DS.attr('string'),
  owner: DS.attr('string'),
  createdDate: DS.attr('date', {
    defaultValue() { return new Date(); }
  }),	
});