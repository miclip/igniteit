import FacilityBase from './base';

export default FacilityBase.extend({
actions:{
	save:function(model){
			var self = this;
			model.set('countryCode','US');
			self.validate().then(function(){
				model.save().then(function(){
						// save the address
						self.store.findRecord('address',model.get('address').get('id')).then((address)=>{
	    				address.save();
	    			});

						var changed = model.changedAttributes();
						
	    			self.store.findRecord('organization',model.get('organizationId')).then((org)=>{

	    					if(changed['organizationId']){
				    			// update previous organization and save 	    			
				    			self.store.findRecord('organization',changed['organizationId'][0]).then((previousOrg)=>{
				    				previousOrg.get('clients').removeObject(model);
				    				previousOrg.save();
				    			});
				    			
			    				org.get('clients').pushObject(model);
			    				org.save();   
	    					} 
		    				
		    				model.get('invite').then((invite)=>{
												
												if(invite.get('email')){
													invite.set('parentId',model.id);
													invite.set('organization',org);
													invite.set('name',model.get('name'));
													invite.save();
													
													//TODO Send Invite Email

													if(invite.get('emailSent')===false)
													{
														invite.set('emailSent', true);
														invite.set('emailSentDate', new Date());
														invite.save();
							
														self.notifications.addNotification({
												      message: 'Invite Email Sent!',
												      type: 'success',
												      autoClear: true,
											    	});
													}
												} else {
													model.get('invite').then((invite)=>{
														invite.destroyRecord();
													});
												}
											});

								self.notifications.addNotification({
					      message: 'Client successfully saved!',
					      type: 'success',
					      autoClear: true,
				      });	   
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