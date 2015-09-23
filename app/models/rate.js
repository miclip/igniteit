import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  rate: DS.attr('number'),  
  organizationId: DS.attr('string'),
  image: DS.attr('string'),
  owner: DS.attr('string'),
  createdDate: DS.attr('date', {
    defaultValue() { return new Date(); }
  }),	
});