import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('register' , { path: '/register' });
  this.route('login', { path: '/login' });
  this.route('reset', { path: '/reset' });
  this.route('dashboard', { resetNamespace: true }, function () {
    this.route('organizations', function() {
      this.route('edit',{path: 'edit/:id'});
      this.route('add');
      this.route('details');
    });
    this.route('facilities', function() {
      this.route('add');
      this.route('edit',{path: 'edit/:id'});
    });
    this.route('trainers');
    this.route('clients');
    this.route('rates');
    this.route('packages');
    this.route('sessions');
    this.route('today');
  });
  this.route('account', { resetNamespace: true }, function () {
    this.route('password');
    this.route('manage');
    this.route('delete');
  });

 
});
export default Router;


