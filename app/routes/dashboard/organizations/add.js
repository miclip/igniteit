import AuthBase from '../../authenticated-base';

export default AuthBase.extend({
	model: function(){
		
	 var uid = this.get('session').get('currentUser').get('id');
   return this.store.createRecord('organization',{
   	owner: uid
   });
 },
 deactivate: function(){
			var model = this.get('controller.model');
			if(model.get('isNew')){
				model.deleteRecord();
			}
			
	},
});
