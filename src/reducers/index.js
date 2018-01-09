import {RESTART_GAME, MAKE_GUESS, GENERATE_AURAL_UPDATE} from './actions';

const initialState = {
    guesses: [],
    feedback: 'Make your first guess!',
    auralStatus: '',
    correctAnswer: Math.round(Math.random() * 100) + 1
}

export const hotColdReducer = (state=initialState, action) => {
    
    //**********************************************************
    //if action #1 - Restart Game - then wipe the state back to its original status
    if (action.type === RESTART_GAME) {
        return Object.assign({}, state, {
            guesses: [],
            feedback: 'Make your first guess!',
            auralStatus: '',
            correctAnswer: action.correctAnswer
        });
    }
    //**********************************************************

    //**********************************************************
    //if action #2 - User Makes a Guess - then update the guess list and generate the relevant feedback
    if (action.type === MAKE_GUESS) {
        let feedback, guess;

        guess = parseInt(action.guess, 10);
        if (isNaN(guess)) {
            return Object.assign({}, state, {
                feedback: 'Please enter a valid number',
                guesses: [...state.guesses, guess]
            });
        }

        const difference = Math.abs(guess - state.correctAnswer);
        if (difference >= 50) {
            feedback = "You're Ice Cold...";
        } else if (difference >= 30) {
            feedback = "You're Cold...";
        } else if (difference >= 10) {
            feedback = "You're Warm.";
        } else if (difference >= 1) {
            feedback = "You're Hot!";
        } else {
            feedback = 'You got it!';
        }

        return Object.assign({}, state, {
            feedback,
            guesses: [...state.guesses, guess]
        });
    }
    //**********************************************************

    //**********************************************************
    //if action #3 - generate a more detailed aural feedback
    if (action.type === GENERATE_AURAL_UPDATE) {
        const {guesses, feedback} = state;

        // If there's not exactly 1 guess, we want to
        // pluralize the nouns in this aural update.
        const pluralize = guesses.length !== 1;

        let auralStatus = `Here's the status of the game right now: ${feedback} You've made ${guesses.length} ${pluralize
            ? 'guesses'
            : 'guess'}.`;

        if (guesses.length > 0) {
            auralStatus += ` ${pluralize
                ? 'In order of most- to least-recent, they are'
                : 'It was'}: ${guesses.reverse().join(', ')}`;
        }

        return Object.assign({}, state, {auralStatus});
    }
    //**********************************************************
    
    return state;
};
