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
    },
    'validationModel.organizationId':{
    	presence: {message: " Must select an organization"},
    },
    
    
},

});
