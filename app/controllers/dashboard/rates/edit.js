import FacilityBase from './base';

export default FacilityBase.extend({
actions:{
	save:function(model){
			var self = this;
			
			self.validate().then(function(){
				model.save().then(function(){
								
					  var changed = model.changedAttributes();
	    			if(changed['organizationId']){	    				
		    			    			
		    			self.store.findRecord('organization',changed['organizationId'][0]).then((previousOrg)=>{
		    				previousOrg.get('rates').removeObject(model);
		    				previousOrg.save();
		    			});
		    			
		    			self.store.findRecord('organization',model.get('organizationId')).then((organization)=>{
	    					organization.get('rates').pushObject(model);
	    					organization.save();  

	    					model.set('organization', organization);
	    					model.save();
	    				});
	    			}   			

						self.set('addSuccess', true);
							self.notifications.addNotification({
				      message: 'Rate successfully saved!',
				      type: 'success',
				      autoClear: true,
			    	});
						self.transitionToRoute('dashboard.rates.index');
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
