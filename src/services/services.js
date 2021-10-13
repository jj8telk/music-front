export const endpoints = {
  ARTIST: "Artist",
  RELEASE: "Release",
};

export function url(path) {
  return "http://localhost:53866/" + path;
}

export const runApi = (apiCall, response) => {
  apiCall()
    .then((res) => {
      if (res.status === 200) {
        let appProcess = res.data;
        if (appProcess.success) {
          if (response !== null) response(appProcess.payload);
        } else console.error(appProcess);
      } else console.error(res);
    })
    .catch((err) => {
      console.error(err);
    });
};
