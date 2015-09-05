// app/controllers/account.js
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
actions:{
	save:function(model){
			var self = this;
			model.set('countryCode','US');
			self.validate().then(function(){
				model.save().then(function(){
					  var uid = self.get('session').get('currentUser').get('id');
						// save the address
						self.store.findRecord('address',model.get('address').get('id')).then((address)=>{
							address.set('parentId',model.get('id'));
	    				address.save();
	    				// update user and save 
							
	    				self.store.findRecord('user',uid).then((user)=>{
	    					user.get('facilities').pushObject(model);
	    					user.get('addresses').pushObject(address);
	    					user.save();
	    				});
	    			});

	    			// update organization and save 
	    			self.store.findRecord('organization',model.get('organizationId')).then((org)=>{
	    				org.get('facilities').pushObject(model);
	    				org.save();
	    			});	    			

						self.set('addSuccess', true);
							self.notifications.addNotification({
				      message: 'Facility successfully added!',
				      type: 'success',
				      autoClear: true,
			    	});
						self.transitionToRoute('dashboard.facilities.index');
				}).catch(function(err){
					console.log("errors:"+err);
				});
			}).catch(function(){
  		console.log('unepxected validation errors');
		  	self.set('hasValidationErrors',true);
  	});
	},
}
});
