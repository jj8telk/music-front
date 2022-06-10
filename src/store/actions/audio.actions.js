import { audioConstants } from "../constants";

export const audioActions = {
  buildSongList,
  setCurrentTrack,
  setAudioState,
  skipBackward,
  skipForward,
  setCurrentTime,
};

function buildSongList(release) {
  return { type: audioConstants.BUILD_SONG_LIST, release };
}

function setCurrentTrack(track) {
  return { type: audioConstants.SET_CURRENT_TRACK, track };
}

function setAudioState(audioState) {
  return { type: audioConstants.SET_AUDIO_STATE, audioState };
}

function skipBackward() {
  return { type: audioConstants.SKIP_BACKWARD };
}

function skipForward() {
  return { type: audioConstants.SKIP_FORWARD };
}

function setCurrentTime(time, duration) {
  if (time === null) time = 0;
  if (isNaN(duration)) duration = 0;
  let timeFormatted = new Date(time * 1000).toISOString().substr(14, 5);
  let durationFormatted = new Date(duration * 1000).toISOString().substr(14, 5);

  return {
    type: audioConstants.SET_CURRENT_TIME,
    time,
    timeFormatted,
    duration,
    durationFormatted,
  };
}
