import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
validationModel: Ember.computed.alias('model'),
validationModelAddress: Ember.computed.alias('model.address'),
hasValidationErrors: false,
addSuccess: false,
userOrganizations: null,
validations: {
    'validationModel.name': {
      presence: {message: " Name is required"},
    },
    'validationModel.organizationId':{
    	presence: {message: " Must select an organization"},
    },
    'validationModelAddress.name':{
    	presence: {message: " Address name is required"},
    },
    'validationModelAddress.line1':{
    	presence: {message: " Line 1 is required"},
    },
    'validationModelAddress.city':{
    	presence: {message: " City is required"},
    },
    'validationModelAddress.state':{
    	presence: {message: " State is required"},
    },
    'validationModelAddress.postCode':{
    	presence: {message: " Zip is required"},
    }
    
},

});
