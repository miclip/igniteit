import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
validationModel: Ember.computed.alias('model'),
hasValidationErrors: false,
addSuccess: false,
userOrganizations: null,
userOrganizationRates: null,
userOrganizationFacilities: null,
userOrganizationTrainers: null,
userOrganizationClients: null,
validations: {
  'validationModel.name': {
    presence: {message: " Name is required"},
  },
   'validationModel.sessionDateTime': {
    presence: {message: " Session Date Time is required"},
  },
  'validationModel.sessionDurationMinutes': {
    presence: {message: " Session Duration is required"},
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
      organization.get('facilities').then((facilities)=>{
        var options = [];
        facilities.forEach(function(facility){
            options.push({id:facility.id,text:facility.get('name')});
        });
        self.set('userOrganizationRatesFacilities', options);
      });  
      organization.get('clients').then((clients)=>{
        var options = [];
        clients.forEach(function(client){
            options.push({id:client.id,text:client.get('name')});
        });
        self.set('userOrganizationRatesClients', options);
      });  
    });
  }.observes('model.organizationId'),
});
