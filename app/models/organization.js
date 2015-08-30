
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  website: DS.attr('string'),
  owner: DS.attr('string'),
  createdDate: DS.attr('date', {
    defaultValue() { return new Date(); }
  }),
  
});
