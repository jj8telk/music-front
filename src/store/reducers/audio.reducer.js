import { audioConstants } from "../constants";

const initialState = {
  songs: null,
  release: null,
  currentTrack: null,
  trackData: {
    currentTime: null,
    duration: null,
    currentTimeFormatted: null,
    durationFormatted: null,
  },
  scrubTime: null,
};

export default function audioReducer(state = initialState, action) {
  let trackIndex = 0;
  switch (action.type) {
    case audioConstants.BUILD_SONG_LIST:
      return {
        ...state,
        release: action.release,
        songs: action.release.tracks.filter((x) => x.type === "track"),
      };
    case audioConstants.SET_CURRENT_TRACK:
      return { ...state, currentTrack: action.track };
    case audioConstants.SET_AUDIO_STATE:
      return {
        ...state,
        isPlaying: action.audioState === "play" ? true : false,
      };
    case audioConstants.SKIP_BACKWARD:
      trackIndex = state.songs.indexOf(state.currentTrack);
      trackIndex--;
      if (trackIndex === -1) trackIndex = state.songs.length - 1;
      return { ...state, currentTrack: state.songs[trackIndex] };
    case audioConstants.SKIP_FORWARD:
      trackIndex = state.songs.indexOf(state.currentTrack);
      trackIndex++;
      if (trackIndex > state.songs.length - 1) trackIndex = 0;
      return { ...state, currentTrack: state.songs[trackIndex] };
    case audioConstants.SET_CURRENT_TIME:
      let data = {
        ...state.trackData,
        currentTime: action.time,
        currentTimeFormatted: action.timeFormatted,
        duration: action.duration,
        durationFormatted: action.durationFormatted,
      };
      return { ...state, trackData: data };
    case audioConstants.SCRUB_TIME:
      return { ...state, scrubTime: action.time };
    default:
      return state;
  }
}
