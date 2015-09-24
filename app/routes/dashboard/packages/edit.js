import AuthBase from '../../authenticated-base';
import Ember from 'ember';

export default AuthBase.extend({
	model: function(params){
		var self = this;
		return new Ember.RSVP.Promise(function(resolve) {
		 	self.store.findRecord('package',params.package_id).then((pack)=>{
			 	resolve(pack);
		  });
		});
	},
 deactivate: function(){
			var model = this.get('controller.model');
			if(model.get('isNew')){
				model.deleteRecord();
			}			
	},
	setupController:function(controller, model){
    controller.set('model', model);
    var self = this;
		var uid = self.get('session').get('currentUser').get('id');
		self.store.findRecord('user',uid).then((user)=>{
		 	 user.get('organizations').then((organizations)=>{
		 	 		var options = [];
		 	 		organizations.forEach(function(org){
		 	 				options.push({id:org.id,text:org.get('name')});
		 	 		});
		 	    controller.set('userOrganizations', options);
		 	});
	 });
	},
	

});