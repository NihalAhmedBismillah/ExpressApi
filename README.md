# ExpressApi
Description: 
Write a backend API for a small app “User Hobbies” with following requirement: 
# Tech stack: 
Nodejs with Typescript, Mongodb with mongoose, Test (Jest or Mocha or Jasmine)
# Tech details:
NodeJS with Typescript (Hint: Make your own nice directory structure of controller, service....etc)
We use Hapi framework (but you can use Express if you like.)
There are 2 different Mongo collections: User {id, name, hobbies}, Hobbies {id, passionLevel, name, year}
Hobbies are not embedded in the User Schema. (please use Mongo refs)
Endpoints will be CRUD of users and hobbies. (for more info on use cases, please refer to your FE contra-part).
Install Swagger interface for the endpoints.
Validate the requests payload coming from FE.
Setup Test using the tech stack mentioned above and write at least one unit test to demonstrate.
FE application:
# Feature:
There would be 2 columns both resizable and scrollable.
In User columns, user will be listed and added.
Right column is blank grey screen until a user is selected.
Data should be loaded initially from the mock at http service layer. (Keeping other flow untouched as if a production app)
Once a user is selected: In Right column, user can now view, add or delete(with confirmation dialog) the hobbies.
Hobby consist of three things mentioned below. Passion can be selected out of “Low“, “Medium“, “High“ and “Very-High“. (Preferably
some validation).

# Setup

```bash
$ git clone https://github.com/NihalAhmedBismillah/ExpressApi.git
$ cd ExpressApi
$ npm install
```

# NPM scripts

- `$ npm run start` to start local development server.
- `$ npm run test` to start test.

# Swagger Api
- For local server
  - http://localhost:3001/api-docs/#/
