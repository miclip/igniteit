import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
validationModel: Ember.computed.alias('model'),
hasValidationErrors: false,
addSuccess: false,

validations: {
  'validationModel.name': {
    presence: {message: " Name is required"},
  },
   'validationModel.sessionDateTime': {
    presence: {message: " Session Date Time is required"},
    numericality:{ messages: { numericality: ' Must be a number' } },
  },
  'validationModel.sessionDurationMinutes': {
    presence: {message: " Session Duration is required"},
    numericality:{ messages: { numericality: ' Must be a number' } },
  },
  'validationModel.organizationId':{
  	presence: {message: " Must select an organization"},
  },
},

});
