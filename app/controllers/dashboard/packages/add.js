import FacilityBase from './base';

export default FacilityBase.extend({
actions:{
	save:function(model){
			var self = this;
			
			self.validate().then(function(){
				model.save().then(function(){

					self.store.findRecord('rate', model.get('rateId')).then((rate)=>{
						model.set('rate',rate);
						model.save();
					});
				  var uid = self.get('session').get('currentUser').get('id');
					// save the address
					self.store.findRecord('user',uid).then((user)=>{
						user.get('packages').pushObject(model);
						user.save();
					});

	  			// update organization and save 
	  			self.store.findRecord('organization',model.get('organizationId')).then((org)=>{
	  				org.get('packages').pushObject(model);
	  				org.save();

	  				model.set('organization', org);
	    			model.save();
	  			});	    			

					self.set('addSuccess', true);
						self.notifications.addNotification({
			      message: 'Package successfully added!',
			      type: 'success',
			      autoClear: true,
		    	});
						
					self.transitionToRoute('dashboard.packages.index');
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
