import { onePlayerGame } from './OnePlayerGame';
import { twoPlayersGame } from './TwoPlayersGame';
import { addEventsToAllFormButtons, getBoardRect } from './formButtons';
import { checkMobileDevice } from './changeScreenFuncs';
import { disableAllCells } from './DOMutils';

const startOneBtn = document.querySelector('.one-player');
startOneBtn.addEventListener('click', e => {
    e.preventDefault();
    const game = onePlayerGame();
    const { HumanGameboard } = game;
    addEventsToAllFormButtons('one', getBoardRect(), HumanGameboard, 'one-player');
    checkMobileDevice();
});

const startTwoBtn = document.querySelector('.two-players');
startTwoBtn.addEventListener('click', e => {
    e.preventDefault();
    const game = twoPlayersGame();
    const { AubreyGameboard, FinchGameboard } = game;
    addEventsToAllFormButtons(
        'one',
        getBoardRect(),
        AubreyGameboard,
        'two-players',
        FinchGameboard,
    );
    disableAllCells();
    checkMobileDevice();
});

/* reloads page after game is over */

const reload = document.querySelector('#reload');
reload.addEventListener('click', e => {
    e.preventDefault();
    location.reload();
});
