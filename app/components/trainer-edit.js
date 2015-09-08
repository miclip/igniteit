import Ember from 'ember';

export default Ember.Component.extend({
	actions:{
		userIsTrainerChanged:function() {
				var elem = this.$('.create-invite');
				if(elem.hasClass('display-none') || !elem.hasClass('showing-invite')) {
					elem.fadeIn(500, function(){
						elem.removeClass('display-none').addClass('showing-invite');
					});

				} else {
					elem.fadeOut(500,function(){
						elem.removeClass('showing-invite');
					});

				}

	  		  
		},
	}
});
