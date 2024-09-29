import request from "supertest";
import { expect } from "chai";
import { baseUrl } from "../../data/config.js";

describe("Login", async function () {

    it("Positive - Success Login", async ()=> {
        const payload = {
            "email": "tokoTesting@gmail.com",
            "password": "@Passwordtoko1"
        }

        //send request
        let response = await request (baseUrl)
            .post("/authentications") //endpoint
            .send(payload) //request body

        expect(response.status).to.equal(201);
        expect(await response.body.status).to.eql("success");
        expect(await response.body.message).to.eql("Authentication berhasil ditambahkan");
    })

})