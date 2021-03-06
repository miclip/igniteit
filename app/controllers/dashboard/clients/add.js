import FacilityBase from './base';

export default FacilityBase.extend({
userIsTrainer: true,
userIdTrainerSet: false,
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
	    					user.get('clients').pushObject(model);
	    					user.get('addresses').pushObject(address);
	    					user.save();
	    				});
	    			});

	    			// update organization and save 
	    			self.store.findRecord('organization',model.get('organizationId')).then((org)=>{
	    				org.get('clients').pushObject(model);
	    				org.save();

	    				model.set('organization', org);
	    				model.save();
	    					    				
							model.get('invite').then((invite)=>{
								console.log("inviteEmail:"+invite.get('email'));
								if(invite.get('email')){
								invite.set('parentId',model.id);
								invite.set('organization',org);
								invite.set('name',model.get('name'));
								invite.save();
								
								//TODO Send Invite Email

								invite.set('emailSent', true);
								invite.set('emailSentDate', new Date());
								invite.save();
	
								self.notifications.addNotification({
						      message: 'Invite Email Sent!',
						      type: 'success',
						      autoClear: true,
					    	});


								} else {
									model.get('invite').then((invite)=>{
										invite.destroyRecord();
									});
								}
							});
							
							
	    			});	    			

						self.set('addSuccess', true);
							self.notifications.addNotification({
				      message: 'Client successfully added!',
				      type: 'success',
				      autoClear: true,
			    	});

						

						self.transitionToRoute('dashboard.clients.index');
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
