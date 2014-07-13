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
      'Babysitting',
      'Moving in/out',
      'Groceries',
      'Transport',
      'Pet care',
      'Emergency',
      'Battlehack'
  ]

  return {
    all: function() {
      return categories;
    }
  }
})
.factory('CategoryImage', function() {
  var categories = {
      'Babysitting' : 'babysitting',
      'Moving in/out' : 'moving-in-out',
      'Groceries' : 'groceries',
      'Transport' : 'transport',
      'Pet care' : 'pet-care',
      'Emergency' : '',
      'Battlehack' : ''
  }

  return {
    getCategoryByName: function (categoryName) {
      categories[categoryName] != null ? 'category/' + categories[categoryName] + '.png' : '#'
    }
  }
}).factory('Tasks', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var tasks = [
    { id: 0, userId: 0, name: 'Task0' },
    { id: 1, userId: 1, name: 'Task1' }
  ];

  return {
    all: function() {
      return tasks;
    },
    get: function(taskId) {
      // Simple index lookup
      return tasks[taskId];
    }
  }
})
.factory('Badges', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var badges = [
    { id: 0, userId: 0, name: 'Badge lvl1'},
    { id: 1, userId: 0, name: 'Badge lvl2'}
  ];

  return {
    all: function() {
      return badges;
    },
    get: function(badgeId) {
      // Simple index lookup
      return badges[badgeId];
    }
  }
});
