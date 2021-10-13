import axios from "axios";
import * as types from "./services";
import { endpoints } from "./services";
import { authHeader } from "./helpers/auth-header";

const releaseService = {
  getModel,
  getList,
};

async function getModel(id) {
  return axios.get(types.url(endpoints.RELEASE + "/" + id), null, authHeader());
}

async function getList(filter) {
  return axios.post(
    types.url(endpoints.RELEASE + "/getList"),
    filter,
    authHeader()
  );
}

export default releaseService;
