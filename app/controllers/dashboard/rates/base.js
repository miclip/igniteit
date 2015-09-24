import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
validationModel: Ember.computed.alias('model'),
hasValidationErrors: false,
addSuccess: false,
userOrganizations: null,
validations: {
    'validationModel.name': {
      presence: {message: " Name is required"},
    },
    'validationModel.rate': {
      presence: {message: " Rate is required"},
      numericality:{ messages: { numericality: ' Must be a number' } },
    },
    'validationModel.organizationId':{
    	presence: {message: " Must select an organization"},
    },
},
organizationName:function(){
  this.store.findRecord('organization',this.get('model.organizationId')).then((organization)=>{
    return organization.get('name');
  });
}.property('model.organizationId')
});
