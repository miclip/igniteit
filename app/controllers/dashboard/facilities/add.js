// app/controllers/account.js
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
    'validationModel.organizationId':{
    	presence: {message: " Must select an organization"},
    }
    
},
actions:{
	save:function(model){
			var self = this;
			self.validate().then(function(){
				model.save().then(function(){

						var uid = self.get('session').get('currentUser').get('id');
	    			self.store.findRecord('user',uid).then((user)=>{
	    				user.get('fa').pushObject(model);
	    				user.save();
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
