import axios from "axios";
import * as types from "./services";
import { endpoints } from "./services";
import { authHeader } from "./helpers/auth-header";

const releaseService = {
  getModel,
  saveModel,
  getList,
  getFileList,
  saveTracks,
  convertFiles,
  previewRenameFiles,
  renameFiles,
  tagFiles,
};

async function getModel(id) {
  return axios.get(
    types.url(endpoints.RELEASE + "/test/" + id),
    null,
    authHeader()
  );
}

async function saveModel(release) {
  return axios.post(
    types.url(endpoints.RELEASE + "/saveModel"),
    release,
    authHeader()
  );
}

async function getList(filter) {
  return axios.post(
    types.url(endpoints.RELEASE + "/getList"),
    filter,
    authHeader()
  );
}

async function getFileList(releaseId) {
  return axios.get(
    types.url(endpoints.RELEASE + "/getFileList/" + releaseId),
    null,
    authHeader()
  );
}

async function saveTracks(tracks) {
  console.log(tracks);
  return axios.post(
    types.url(endpoints.RELEASE + "/saveTracks"),
    tracks,
    authHeader()
  );
}

async function convertFiles(releaseId) {
  return axios.get(
    types.url(endpoints.RELEASE + "/convertFiles/" + releaseId),
    null,
    authHeader()
  );
}

async function previewRenameFiles(releaseId) {
  return axios.get(
    types.url(endpoints.RELEASE + "/previewRenameFiles/" + releaseId),
    null,
    authHeader()
  );
}

async function renameFiles(releaseId) {
  return axios.get(
    types.url(endpoints.RELEASE + "/renameFiles/" + releaseId),
    null,
    authHeader()
  );
}

async function tagFiles(releaseId) {
  return axios.get(
    types.url(endpoints.RELEASE + "/tagFiles/" + releaseId),
    null,
    authHeader()
  );
}

export default releaseService;
