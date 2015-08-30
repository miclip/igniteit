import AuthBase from '../../authenticated-base';

export default AuthBase.extend({
	model: function(params){
			return this.store.find('organization',params.id);
 },
});
