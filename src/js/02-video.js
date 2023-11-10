import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const LOCAL_STORAGE_KEY = 'playback-time';
const player = new Player(document.querySelector('iframe'));

player.setCurrentTime(Number(localStorage.getItem(LOCAL_STORAGE_KEY)));

player.on(
  'timeupdate',
  throttle(
    data =>
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.seconds)),
    1000
  )
);