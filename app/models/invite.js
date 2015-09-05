import DS from 'ember-data';

export default DS.Model.extend({
	email: DS.attr('string'),
	name: DS.attr('string'),
	organization: DS.belongsTo('organization',{async:true}),
	invitedBy : DS.belongsTo('user',{async:true}),
	emailSent: DS.attr('boolean'),
	emailSentDate: DS.attr('date'),
  role: DS.attr('string'),
	createdDate: DS.attr('date', {
    defaultValue() { return new Date(); }
  }),
});
