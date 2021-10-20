import axios from "axios";
import * as types from "./services";
import { endpoints } from "./services";
import { authHeader } from "./helpers/auth-header";

const artistService = {
  getReleaseArtists,
};

async function getReleaseArtists() {
  return axios.get(
    types.url(endpoints.ARTIST + "/releaseArtists"),
    null,
    authHeader()
  );
}

export default artistService;
