import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  name: DS.attr('string'),
  password: DS.attr('string'),
  passwordConfirmation: DS.attr('string'),
  deleted: DS.attr('boolean', {defaultValue:false}),
  deletedDate: DS.attr('date'),
  createdDate: DS.attr('date', {
    defaultValue() { return new Date(); }
  }),
  displayName: Ember.computed('name', 'email', function() {
  	var name = this.get('name');
    return (name != null) ? name : this.get('email');
  }),
  organizations: DS.hasMany('organization', {async : true}),
  facilities: DS.hasMany('facility', {async : true}),
  addresses: DS.hasMany('address', {async : true}),
  trainers: DS.hasMany('trainer', {async : true}),
  clients: DS.hasMany('client', {async : true}),
  rates: DS.hasMany('rate', {async : true}),
  packages: DS.hasMany('package', {async : true}),
  session: DS.hasMany('session', {async : true}),
});
