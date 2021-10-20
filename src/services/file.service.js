import axios from "axios";
import * as types from "./services";
import { endpoints } from "./services";
import { authHeader } from "./helpers/auth-header";

const fileService = {
  getFileList,
  getFolderContents,
};

async function getFileList(folder) {
  return axios.get(
    types.url(endpoints.FILE + "/files/" + folder),
    null,
    authHeader()
  );
}

async function getFolderContents(folder) {
  folder = folder.replace("&", "%26");
  console.log(folder);
  return axios.get(
    types.url(endpoints.FILE + "/getFolderContents?folder=" + folder),
    null,
    authHeader()
  );
}

export default fileService;
