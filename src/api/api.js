import axios from "axios";
import { getFromLocalStorage, saveToLocalStorage } from "./tokenStorage";
import jwtDecode from "jwt-decode";

const url = "https://mentalmate.brainstormingapplication.com/api/";
const accessToken = getFromLocalStorage("ACCESS_TOKEN");
const refreshToken = getFromLocalStorage("REFRESH_TOKEN");
let token;
if (accessToken) {
    // eslint-disable-next-line no-unused-vars
    token = jwtDecode(accessToken);
    console.log(token);
}

// --------------- PROFILE ------------------------

export const profileApi = async () => {
    try {
        const userId = jwtDecode(accessToken).user_id;
        const response = await axios.get(url + `psycho/${userId}/`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const registerApi = async (username, email, password ) => {
    try {
        return await axios.post(url + "register/", {
            username: username,
            email: email,
            password: password
        });
    } catch (error) {
        return error.response;
    }
};
export const loginApi = async (username, password) => {
    try {
        const response = await axios.post(url + "token/", {
            username: username,
            password: password,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};


export const refresh = async () => {
    try {
        const response = await axios.post(url + "token/refresh/", {
            refresh: refreshToken,
        });
        saveToLocalStorage("ACCESS_TOKEN", response.data.access);
    } catch (error) {
        console.log(error);
    }
};


// --------------- GOOGLE LOGIN ------------------------

export const onSuccess = (response) => {
    console.log("Success:", response);
    sendTokenToBackend(response.credential).then();
};
export const onFailure = (response) => {
    console.log("Failure:", response);
};

export const sendTokenToBackend = async (tokenId) => {
    try {
        console.log(tokenId);
        const response = await axios.post(
            url + "google_login/",
            {
                token: tokenId,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = response.data;
        saveToLocalStorage("ACCESS_TOKEN", data.access);
        saveToLocalStorage("REFRESH_TOKEN", data.refresh);
        if(location.pathname==='/login')
        {
            window.location.href='/';
        }
    } catch (error) {
        console.error("Error while sending token to backend:", error);
    }
};
