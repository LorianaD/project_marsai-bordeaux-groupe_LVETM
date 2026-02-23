// DECONNEXION

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
}

export default logout;