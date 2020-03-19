import { onePlayerGame } from './OnePlayerGame';
import { addEventsToAllFormButtons } from './formButtons';

const startOneBtn = document.querySelector('.one-player');
startOneBtn.addEventListener('click', e => {
    e.preventDefault();
    const game = onePlayerGame();
    addEventsToAllFormButtons(game);
});

const startTwoBtn = document.querySelector('.two-players');
startTwoBtn.addEventListener('click', e => {
    e.preventDefault();
    const game = twoPlayerGame();
});

/* reloads page after game is over */

const reload = document.querySelector('#reload');
reload.addEventListener('click', e => {
    e.preventDefault();
    location.reload();
});
