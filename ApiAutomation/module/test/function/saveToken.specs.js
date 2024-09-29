import request from "supertest";
import { baseUrl } from "../../data/config.js";

export async function saveToken() {
    const payload = {
        "email": "tokoTesting@gmail.com",
        "password": "@Passwordtoko1"
    }

    //send request
    const response = await request (baseUrl)
        .post("/authentications") //endpoint
        .send(payload) //request body

    const accessToken =  (await response).body.data.accessToken;
    return accessToken;
}