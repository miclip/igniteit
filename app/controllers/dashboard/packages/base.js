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
    'validationModel.rateId': {
      presence: {message: " Must select a Rate"},
    },
    'validationModel.discount': {
      presence: {message: " Discount is required"},
      numericality:{ messages: { numericality: ' Must be a number' } },
    },
    'validationModel.numberOfSessions': {
      presence: {message: " # Sessions is required"},
      numericality:{ messages: { numericality: ' Must be a number' } },
    },
    'validationModel.organizationId':{
    	presence: {message: " Must select an organization"},
    },
},

});
