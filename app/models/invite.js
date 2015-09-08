import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
	email: DS.attr('string'),
	name: DS.attr('string'),
	organization: DS.belongsTo('organization',{async:true}),
	invitedBy : DS.belongsTo('user',{async:true}),
	emailSent: DS.attr('boolean'),
	emailSentDate: DS.attr('date'),
	accepted: DS.attr('boolean'),
  role: DS.attr('string'),
  owner:DS.attr('string'),
	createdDate: DS.attr('date', {
    defaultValue() { return new Date(); }
  }),
  roleCapitalized: Ember.computed('role', function(){
  	var role = this.get('role');
  	return role.capitalize();
  }),
});
