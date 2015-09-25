import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  address: DS.belongsTo('address',{async:true}),	
  image: DS.attr('string'),
  organizationId: DS.attr('string'),
  organization: DS.belongsTo('organization',{async:true}),
  owner: DS.attr('string'),
  createdDate: DS.attr('date', {
    defaultValue() { return new Date(); }
  }),


});
