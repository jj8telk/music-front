import { audioConstants } from "../constants";

export const audioActions = {
  buildSongList,
  setCurrentTrack,
  setAudioState,
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
