const request = require("supertest");
const server = require("./server.js");

describe("server.js", () => {
    describe("GET /", () => {
      it("should respond with 200 OK", () => {
        return request(server).get("/").expect(200);
      });

      it("should be JSON", () => {
        return request(server).get("/").expect("Content-Type", /json/);
      });

      it("should get return {'It's alive!' }", () => {
          return request(server)
            .get("/").then(res => {
                expect(res.body.api).toBe( "It's alive!" );
            });
        });
  
    });
  });