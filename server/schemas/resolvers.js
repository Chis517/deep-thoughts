const { User, Thought } = require('../models');

const resolvers = {
  Query: {
    // Get all Thoughts
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    // Get a Thought by ID
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },
    // Get all Users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts');
    },
    // Get a User by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts');
    }
  }
};

module.exports = resolvers;