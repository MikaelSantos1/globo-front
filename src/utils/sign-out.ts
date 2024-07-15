export function signOut() {
  localStorage.removeItem("authToken");

  window.location.href = "/login";
}
