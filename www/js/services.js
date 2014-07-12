angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Users', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var users = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return users;
    },
    get: function(userId) {
      // Simple index lookup
      return users[userId];
    }
  }
})
.factory('Categories', function() {
  var categories = [
    { id: 0, name: 'Category1' },
    { id: 1, name: 'Category2' },
    { id: 2, name: 'Category3' },
    { id: 3, name: 'Category4' }
  ];

  return {
    all: function() {
      return categories;
    }
  }
});
