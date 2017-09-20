import { PlayAudio } from '../actions/audio';

export function* playAudio(action: PlayAudio) {
  try {
    yield action.file.play();
  } catch (e) {
    console.log('Playing audio failed.');
  }
}
