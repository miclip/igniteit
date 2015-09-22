import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  userId: DS.attr('string'),
  address: DS.belongsTo('address',{async:true}),	
  organizationId: DS.attr('string'),
  image: DS.attr('string'),
  owner: DS.attr('string'),
  invite: DS.belongsTo('invite',{async:true}),
  createdDate: DS.attr('date', {
    defaultValue() { return new Date(); }
  }),	
});