import FacilityBase from './base';

export default FacilityBase.extend({
actions:{
	save:function(model){
			var self = this;
			
			self.validate().then(function(){
				model.save().then(function(){
					  var uid = self.get('session').get('currentUser').get('id');
								
					  var changed = model.changedAttributes();
	    			if(changed['organizationId']){
		    			    			
		    			self.store.findRecord('organization',changed['organizationId'][0]).then((previousOrg)=>{
		    				previousOrg.get('rates').removeObject(model);
		    				previousOrg.save();
		    			});
		    			
		    			self.store.findRecord('organization',model.get('organizationId')).then((org)=>{
	    					org.get('rates').pushObject(model);
	    					org.save();   
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
