import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
validationModel: Ember.computed.alias('model'),
hasValidationErrors: false,
addSuccess: false,
userOrganizations: null,
userOrganizationRates: null,
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
onOrganizationChange: function () { 
    var self = this;
    var organizationId = this.get('model.organizationId');
    if(!organizationId){
      return;
    }
    self.store.findRecord('organization',organizationId).then((organization)=>{
      organization.get('rates').then((rates)=>{
        var options = [];
        rates.forEach(function(rate){
            options.push({id:rate.id,text:rate.get('name')});
        });
        self.set('userOrganizationRates', options);
      });
    
    });
  }.observes('model.organizationId'),
});
