import AuthBase from '../../authenticated-base';

export default AuthBase.extend({
	model: function(){
		
	 var uid = this.get('session').get('currentUser').get('id');
   return this.store.createRecord('facility',{
   		owner: uid
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