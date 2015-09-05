import FacilityBase from './base';

export default FacilityBase.extend({
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
	    					user.get('trainers').pushObject(model);
	    					user.get('addresses').pushObject(address);
	    					user.save();
	    				});
	    			});

	    			// update organization and save 
	    			self.store.findRecord('organization',model.get('organizationId')).then((org)=>{
	    				org.get('trainers').pushObject(model);
	    				org.save();
	    			});	    			

						self.set('addSuccess', true);
							self.notifications.addNotification({
				      message: 'Trainer successfully added!',
				      type: 'success',
				      autoClear: true,
			    	});
						self.transitionToRoute('dashboard.trainers.index');
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
