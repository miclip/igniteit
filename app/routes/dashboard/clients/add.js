import AuthBase from '../../authenticated-base';
import Ember from 'ember';

export default AuthBase.extend({
	model: function(){
	 var self = this;
	 var uid = self.get('session').get('currentUser').get('id');
    return new Ember.RSVP.Promise(function(resolve){
    	self.store.findRecord('user',uid).then((user)=>{
    		var invite = self.store.createRecord('invite', {invitedBy: user,role:'client',owner: uid });
		   	 resolve(self.store.createRecord('client',{
		   		owner: uid,
		   		address: self.store.createRecord('address',{owner:uid, addressType:'client'}),
		   		invite: invite
		   		})
		   	 );
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
    // set user orgs for select2
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
