import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  rateId: DS.attr('string'),
  rate: DS.belongsTo('rate',{async:true}),	
  discount: DS.attr('number'),
  organizationId: DS.attr('string'),
  numberOfSessions : DS.attr('number'),
  owner: DS.attr('string'),
  createdDate: DS.attr('date', {
    defaultValue() { return new Date(); }
  }),	
});