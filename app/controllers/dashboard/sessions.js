import Ember from 'ember';

export default Ember.Controller.extend({
occurrences: null,
selections: null,
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
onOrganizationChange: function () { 
    var self = this;
    var organizationId = this.get('model.organizationId');
    if(!organizationId){
      return;
    }
    self.store.findRecord('organization',organizationId).then((organization)=>{
       organization.get('facilities').then((facilities)=>{
        var options = [];
        facilities.forEach(function(facility){
            options.push({id:facility.id,text:facility.get('name')});
        });
        self.set('userOrganizationFacilities', options);
      });  
      organization.get('clients').then((clients)=>{
        var options = [];
        clients.forEach(function(client){
            options.push({id:client.id,text:client.get('name')});
        });
        self.set('userOrganizationClients', options);
      })
      organization.get('rates').then((rates)=>{
        var options = [];
        rates.forEach(function(rate){
            options.push({id:rate.id,text:rate.get('name')});
        });
        self.set('userOrganizationRates', options);
      });
      organization.get('trainers').then((trainers)=>{
        var options = [];
        trainers.forEach(function(trainer){
            options.push({id:trainer.id,text:trainer.get('name')});
        });
        self.set('userOrganizationTrainers', options);
      });  
     
      
    });
  }.observes('model.organizationId'),

	_initializeDefaults: Ember.on('init', function(){
		if(this.get('selections') == null){
			this.set('selections', Ember.A());
		}
		if(this.get('occurrences') == null){
			this.set('occurrences', Ember.A());
		}
	}),
	actions:{
		
		calendarUpdateOccurrence: function(occurrence, properties){
			occurrence.setProperties(properties);
		},
		calendarRemoveOccurrence: function(occurrence){
			this.get('occurrences').removeObject(occurrence);
	},
	saveSession:function(model){
			var startDate = model.get('sessionDateTime');
			var endDate = new Date(startDate);
			endDate.setMinutes(endDate.getMinutes() + model.get('sessionDurationMinutes'));
					
			this.get('occurrences').pushObject(Ember.Object.create({
				title: 'Training',
				startsAt: startDate,
				endsAt: endDate,
			}));
		return;
				var self = this;		
				model.destroyRecord().then(function(){	

						var uid = self.get('session').get('currentUser').get('id');
	    			self.store.findRecord('user',uid).then((user)=>{
	    				user.get('organizations').removeObject(model);
	    				user.save();
	    			});

 						self.notifications.addNotification({
						  message: 'Organization successfully deleted!',
						  type: 'warning',
						  autoClear: true,
						});		
						
				}).catch(function(err){
					// TODO 
					console.log("errors:"+err);
				});
			
  	
	},
}
});
