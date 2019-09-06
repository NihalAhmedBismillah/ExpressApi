
import * as request from 'request';
import { app } from '../../../app';
import * as  http from 'http';
const baseUrl = "http://localhost:3001";

describe('Test for HobbiesController class', () => {
    let server;
    beforeAll((done) => {
        try {
            // TODO : For now i am inserting and update data in actual db but we can config with fake db and run test
            server = http.createServer(app);
            server.listen(done);
        } catch (error) {
            console.log('Error :', JSON.stringify(error));
            process.exit(1);
        }
    });

    test('Scenario check server running or not ====>\n', async (done) => {
        request(baseUrl, (error, response, body) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    test('Scenario  post  request  for  hobbies====>\n', async (done) => {

        const hobbies = { 'name': 'Markus', 'passionLevel': 'High', 'year': 2003, 'userHobbies': 'test 1' };
        const option: any = {
            json: hobbies,
            method: "POST",
            url: `${baseUrl}/api/v1/hobbies`,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        request(option, (error, response, body) => {
            expect(response.statusCode).toBe(200);
            done();
        });

    });

    test('Scenario get request  for  hobbies ====>\n', async (done) => {

        let option: any = {
            method: "GET",
            url: `${baseUrl}/api/v1/hobbies`,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        request(option, (error, response, body) => {
            expect(response.statusCode).toBe(200);
            done();
        });

    });
    afterAll((done) => {
        server.close(done);
    });
    // We can also add multiple scenarios 
});