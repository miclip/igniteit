import AuthBase from '../../authenticated-base';

export default AuthBase.extend({
	model: function(params){
			return this.store.find('organization',params.id);
 },
 deactivate: function(){
			var model = this.get('controller.model');
			if(model.get('isNew')){
				model.deleteRecord();
			}
			
	},
});
