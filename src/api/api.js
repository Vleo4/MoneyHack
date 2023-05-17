import axios from "axios";
import { getFromLocalStorage, saveToLocalStorage } from "./tokenStorage";
import jwtDecode from "jwt-decode";

const url = "https://moneyhack.brainstormingapplication.com/api/";
const accessToken = getFromLocalStorage("ACCESS_TOKEN");
const refreshToken = getFromLocalStorage("REFRESH_TOKEN");
let token;
if (accessToken) {
    // eslint-disable-next-line no-unused-vars
    token = jwtDecode(accessToken);
    console.log(token);
}


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

export const getProfit = async () => {
    try {
        const response = await axios.get(url + "profits/",
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                },
            });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const newProfit = async (note,value,category,time) => {
    try {
        const response = await axios.post(url + "profit/create/",
        {
            "note": note,
            "value": value,
            "category": category,
            "time": time+"T00:00:00Z"
        },
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                },
            });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const editProfit = async (note,value,category,time,id) => {
    try {
        const response = await axios.put(url + "profit/update/"+id+"/",
            {
                "note": note,
                "value": value,
                "category": category,
                "time": time+"T00:00:00Z"
            },
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                },
            });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const deleteProfit = async (id) => {
    try {
        const response = await axios.delete(url + "profit/destroy/"+id+"/",
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                },
            });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};


// --------------- LOSS ------------------------
export const getLoss = async () => {
    try {
        const response = await axios.get(url + "looses/",
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                },
            });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const newLoss = async (note,value,category,time) => {
    try {
        const response = await axios.post(url + "lose/create/",
        {
            "note": note,
            "value": value,
            "category": category,
            "time": time+"T00:00:00Z"
        },
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                },
            });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const editLoss = async (note,value,category,time,id) => {
    try {
        const response = await axios.put(url + "lose/update/"+id+"/",
            {
                "note": note,
                "value": value,
                "category": category,
                "time": time+"T00:00:00Z"
            },
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                },
            });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const deleteLoss = async (id) => {
    try {
        const response = await axios.delete(url + "lose/destroy/"+id+"/",
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                },
            });
        return response.data;
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
        window.location.href='/profit';
    } catch (error) {
        console.error("Error while sending token to backend:", error);
    }
};
