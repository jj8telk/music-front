import { audioConstants } from "../constants";

const initialState = { songs: null, release: null, currentTrack: null };

export default function audioReducer(state = initialState, action) {
  switch (action.type) {
    case audioConstants.BUILD_SONG_LIST:
      return {
        ...state,
        release: action.release,
        songs: action.release.tracks,
      };
    case audioConstants.SET_CURRENT_TRACK:
      return { ...state, currentTrack: action.track };
    case audioConstants.SET_AUDIO_STATE:
      return {
        ...state,
        isPlaying: action.audioState === "play" ? true : false,
      };
    default:
      return state;
  }
}
