import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  rateId: DS.attr('string'),
  rate: DS.belongsTo('rate',{async:true}),	
  package: DS.belongsTo('package',{async:true}),	
  packageId: DS.attr('string'),
  sessionDateTime: DS.attr('date'),
  sessionDurationMinutes: DS.attr('number'),
  organizationId: DS.attr('string'),
  organization: DS.belongsTo('organization',{async:true}),
  trainer: DS.belongsTo('trainer', {async:true}),
  trainerId: DS.attr('string'),
  client: DS.belongsTo('client', {async:true}),
  clientId: DS.attr('string'),
  facility: DS.belongsTo('facility', {async:true}),
  facilityId: DS.attr('string'),
  location: DS.attr('string'),
  owner: DS.attr('string'),
  createdDate: DS.attr('date', {
    defaultValue() { return new Date(); }
  }),	
});