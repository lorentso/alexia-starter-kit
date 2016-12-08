'use strict';

const storyTeller = require('./storyTeller');

module.exports = app => {

  const storyTypes = ['funny', 'sad', 'dumb'];

  app.customSlot('StoryType', storyTypes);

  app.action({
    from: '*',
    to: 'StoryIntent'
  });

  app.action({
    from: 'StoryIntent',
    to: 'ChooseStoryTypeIntent',
    if: (slots, attrs) => attrs.decisionWaiting === true
  });

  app.builtInIntent('stop', () => {
    return {
      text: 'Ok. Good bye',
      end: true
    };
  });


  app.intent('StoryIntent', 'I want to hear a story', (slots, attrs, data) => {

    let typesHead = storyTypes.slice(0, 2).join(', ');
    let typesTail = storyTypes[2];

    let response = `I know ${typesHead} and ${typesTail} stories. What kind do you want to hear?`;

    return {
      text: response,
      attrs: {
        decisionWaiting: true
      },
      end: false
    };
  });

  app.intent('ChooseStoryTypeIntent', '{type:StoryType}', (slots, attrs, data) => {
    if (!slots.type) {
      return "I didn't understand what kind of story you want to hear.";
    }
    return storyTeller.getStory(slots.type);

  });
};
