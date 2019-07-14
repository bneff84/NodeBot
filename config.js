let io = require('./lib/Io.js');

module.exports = {
    automations: {},
    actions: {
        /*
         * Targeting
         */
        targetSelf: {
            type: 'keypress',
            keys: 'F1'
        },
        targetGroupMember1: {
            type: 'keypress',
            keys: 'F2'
        },
        targetGroupMember2: {
            type: 'keypress',
            keys: 'F3'
        },
        targetGroupMember3: {
            type: 'keypress',
            keys: 'F4'
        },
        targetGroupMember4: {
            type: 'keypress',
            keys: 'F5'
        },
        targetGroupMember5: {
            type: 'keypress',
            keys: 'F6'
        },
        targetExtendedTarget1: {
            type: 'keycombination',
            keys: ['control','F1']
        },
        targetExtendedTarget2: {
            type: 'keycombination',
            keys: ['control','F1']
        },
        targetExtendedTarget3: {
            type: 'keycombination',
            keys: ['control','F1']
        },
        targetExtendedTarget4: {
            type: 'keycombination',
            keys: ['control','F1']
        },
        targetExtendedTarget5: {
            type: 'keycombination',
            keys: ['control','F1']
        },
        targetMainGroupMember: {
            type: 'keypress',
            keys: '='
        },
        assist: {
            type: 'keypress',
            keys: '1',
        },

        /*
         * Movement
         */
        moveForwardDown: {
            type: 'keysequence',
            keys: [
                ['w', io.EVENT_KEY_DOWN]
            ]
        },
        moveForwardUp: {
            type: 'keysequence',
            keys: [
                ['w', io.EVENT_KEY_UP]
            ]
        },
        moveBackwardDown: {
            type: 'keysequence',
            keys: [
                ['s', io.EVENT_KEY_DOWN]
            ]
        },
        moveBackwardUp: {
            type: 'keysequence',
            keys: [
                ['s', io.EVENT_KEY_UP]
            ]
        },
        moveLeftDown: {
            type: 'keysequence',
            keys: [
                ['a', io.EVENT_KEY_DOWN]
            ]
        },
        moveLeftUp: {
            type: 'keysequence',
            keys: [
                ['a', io.EVENT_KEY_UP]
            ]
        },
        moveRightDown: {
            type: 'keysequence',
            keys: [
                ['d', io.EVENT_KEY_DOWN]
            ]
        },
        moveRightUp: {
            type: 'keysequence',
            keys: [
                ['d', io.EVENT_KEY_UP]
            ]
        },
        moveJump: {
            type: 'keypress',
            keys: 'space'
        },
        moveSitToggle: {
            type: 'keycombination',
            keys: ['control', 's']
        },
        moveCrouchToggle: {
            type: 'keypress',
            keys: 'x'
        },
        followTarget: {
            type: 'keypress',
            keys: '-'
        },

        /*
         * Abilities
         */
        ability1: {
            type: 'keypress',
            keys: '1'
        },
        ability2: {
            type: 'keypress',
            keys: '2'
        },
        ability3: {
            type: 'keypress',
            keys: '3'
        },
        ability4: {
            type: 'keypress',
            keys: '4'
        },
        ability5: {
            type: 'keypress',
            keys: '5'
        },
        ability6: {
            type: 'keypress',
            keys: '6'
        },
        ability7: {
            type: 'keypress',
            keys: '7'
        },
        ability8: {
            type: 'keypress',
            keys: '8'
        },
        ability9: {
            type: 'keypress',
            keys: '9'
        },
        ability10: {
            type: 'keypress',
            keys: '0'
        },
        ability11: {
            type: 'keypress',
            keys: '-'
        },
        ability12: {
            type: 'keypress',
            keys: '='
        },

        /*
         * Ability aliases (Actions)
         */
        actionCombatSpammable: {
            type: 'keypress',
            keys: '2'
        },
        actionHealTarget: {
            type: 'keypress',
            keys: '3'
        },
        actionDotTarget: {
            type: 'keypress',
            keys: '4'
        },
        actionNukeTarget: {
            type: 'keypress',
            keys: '5'
        },
        // break
        actionBuffTargetShort: {
            type: 'keypress',
            keys: '8'
        },
        actionBuffTargetLong: {
            type: 'keypress',
            keys: '9'
        },
        actionBuffGroup: {
            type: 'keypress',
            keys: '0'
        }
    }
};