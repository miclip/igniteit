import FacilityBase from './base';

export default FacilityBase.extend({
actions:{
	save:function(model){
			var self = this;
			
			self.validate().then(function(){
				var changed = model.changedAttributes();

				model.save().then(function(){

					if(changed['rateId']){
						self.store.findRecord('rate', model.get('rateId')).then((rate)=>{
							model.set('rate',rate);
							model.save();
						});
					}

				  if(changed['organizationId']){		    			    			
	    			self.store.findRecord('organization',changed['organizationId'][0]).then((previousOrg)=>{
	    				previousOrg.get('packages').removeObject(model);
	    				previousOrg.save();
	    			});
	    			
	    			self.store.findRecord('organization',model.get('organizationId')).then((org)=>{
    					org.get('packages').pushObject(model);
    					org.save();   
    				});
	    		}  	

					self.set('addSuccess', true);
						self.notifications.addNotification({
			      message: 'Package successfully saved!',
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
