import request from "supertest";
import { expect } from "chai";
import { baseUrl } from "../../data/config.js";
import { saveToken } from "../function/saveToken.specs.js";

describe("User", async function () {

    this.timeout(10000);
    let accessToken;
    let userId;

    it("Positive - Success Create User", async () => {
        const payload = {
            "name": "Kasir Testing Satu",
            "email": "kasirtestingsatu@gmail.com",
            "password": "@Passwordkasirsatu"
        }

        accessToken = await saveToken();

        //send request
        let response = await request(baseUrl)
            .post("/users") //endpoint
            .set({ "Authorization": `Bearer ${accessToken}` })//auth token
            .send(payload) //request body

        expect(response.status).to.equal(201);
        expect(await response.body.status).to.eql("success");
        expect(await response.body.message).to.eql("User berhasil ditambahkan");
        expect(await response.body.data.name).not.to.be.null;
        expect(await response.body.data.userId).not.to.be.null;
        userId = response.body.data.userId;
    })

    it('Positive - Success Get User Detail', async () => {
        let response = await request(baseUrl) //base url
            .get(`/users/` + `${userId}`) //endpoint with query param
            .set({ "Authorization": `Bearer ${accessToken}` })//auth token

        //Assertion menggunakan chai
        expect(response.status).to.equal(200);
        expect(await response.body.status).to.eql("success");
        expect(await response.body.data.user.role).to.eql("kasir");
    })

    it('Positive - Success Get User List', async () => {
        let response = await request(baseUrl) //base url
            .get("/users") //endpoint with query param
            .set({ "Authorization": `Bearer ${accessToken}` })//auth token

        //Assertion menggunakan chai
        expect(response.status).to.equal(200);
        expect(await response.body.status).to.eql("success");
    })

    it('Positive - Success Update User', async () => {

        const payload = {
            "name": "Kasir Testing Satu Update",
            "email": "kasirtestingsatuupdate@gmail.com"
        }

        let response = await request(baseUrl) //base url
            .put(`/users/` + `${userId}`) //endpoint with query param
            .set({ "Authorization": `Bearer ${accessToken}` })//auth token
            .send(payload)

        //Assertion menggunakan chai
        expect(response.status).to.equal(200);
        expect(await response.body.status).to.eql("success");
        expect(await response.body.message).to.eql("User berhasil diupdate");
    })

    it('Positive - Success Delete User', async () => {
        let response = await request(baseUrl) //base url
            .delete(`/users/` + `${userId}`) //endpoint with query param
            .set({ "Authorization": `Bearer ${accessToken}` })//auth token

        //Assertion menggunakan chai
        expect(response.status).to.equal(200);
        expect(await response.body.status).to.eql("success");
        expect(await response.body.message).to.eql("User berhasil dihapus");
    })

})