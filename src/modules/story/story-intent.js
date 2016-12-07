'use strict';

const storyTeller = require('./storyTeller');

module.exports = app => {

    const storyTypes = ['funny', 'sad', 'dummy'];
    
    app.customSlot('StoryType', ['funny', 'sad', 'dummy']);

    const utterances = [
        'I want to hear a story.'
    ];

    app.action({
        from: '*',
        to: 'StoryIntent'
    });

    app.action({
        from: 'StoryIntent',
        to: 'ChooseStoryTypeIntent',
        if: (slots, attrs) => attrs.decisionWaiting === true
    });

    app.intent('StoryIntent', 'I want to hear a story', (slots, attrs, data) => { 
        
        let typesHead = storyTypes.slice(0,2).join(', ');
        let typesTail = storyTypes[2];

        let response = `I know ${typesHead} and ${typesTail} type of stories. What kind do you want to hear?`;

        return {
            text: response,
            attrs: {
              decisionWaiting:true
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
} 
