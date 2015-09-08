import Ember from 'ember';

export function increment(number) {
 return (+number)+1;
}


export default Ember.Helper.helper(increment);