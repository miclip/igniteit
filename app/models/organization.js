
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  website: DS.attr('string'),
  owner: DS.attr('string'),
	logo: DS.attr('string'),
  createdDate: DS.attr('date', {
    defaultValue() { return new Date(); }
  }),
  facilities: DS.hasMany('facility', {async : true}),
  trainers: DS.hasMany('trainer', {async : true}),
  clients: DS.hasMany('client', {async : true}),
  rates: DS.hasMany('rate', {async : true}),
  packages: DS.hasMany('package', {async : true}),
  trainingSessions: DS.hasMany('trainingSessions', {async : true}),
});
