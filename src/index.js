import { onePlayerGame } from './OnePlayerGame';
import { twoPlayersGame } from './TwoPlayersGame';
import { addEventsToAllFormButtons } from './formButtons';

const startOneBtn = document.querySelector('.one-player');
startOneBtn.addEventListener('click', e => {
    e.preventDefault();
    const game = onePlayerGame();
    const { HumanGameboard } = game;
    addEventsToAllFormButtons('one', HumanGameboard, 'one-player');
});

const startTwoBtn = document.querySelector('.two-players');
startTwoBtn.addEventListener('click', e => {
    e.preventDefault();
    const game = twoPlayersGame();
    const { AubreyGameboard, FinchGameboard } = game;
    addEventsToAllFormButtons('one', AubreyGameboard, 'two-players');
});

/* reloads page after game is over */

const reload = document.querySelector('#reload');
reload.addEventListener('click', e => {
    e.preventDefault();
    location.reload();
});
