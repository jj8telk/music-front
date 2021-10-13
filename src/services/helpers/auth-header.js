export function authHeader() {
  let token = localStorage.getItem("token");

  if (token) return { headers: { Authorization: "Bearer " + token } };
  else return {};
}
