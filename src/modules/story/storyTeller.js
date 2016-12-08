'use strict';

const stories = {
  'funny': [
    'Funny story....'
  ],
  'sad': [
    'Sad story...'
  ]
}
module.exports = {

  getStory: type => {
    let story = stories[type];
    if (!story) {
      return `I don't know any ${type} story!`;
    }
    return story[0];
  }
}