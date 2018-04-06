# WEconnect
[![Build Status](https://travis-ci.org/d-beloved/WEconnect.svg?branch=develop)](https://travis-ci.org/d-beloved/WEconnect)
[![Coverage Status](https://coveralls.io/repos/github/d-beloved/WEconnect/badge.svg?branch=develop)](https://coveralls.io/github/d-beloved/WEconnect?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/81369faf28a735ae202b/maintainability)](https://codeclimate.com/github/d-beloved/WEconnect/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/81369faf28a735ae202b/test_coverage)](https://codeclimate.com/github/d-beloved/WEconnect/test_coverage)

WeConnect provides a platform that brings businesses and individuals together.

This platform creates awareness for businesses and gives the users the ability to write reviews about the
businesses they have interacted with.

The static version of WEconnect app can be accessed on [github pages](https://d-beloved.github.io/WEconnect/template).

The first release of the **app-server** using in-memory/dummy data is hosted on [heroku](https://ayo-weconnect-dummy.herokuapp.com/api/v1).

## Made With
  ### Template
    * Bootstrap 4 for UI styling
    * CSS for custom styling
    * Html for the web pages
    * Javascript to add some behaviour

 ### Server
    * Nodejs for server-side logic
    * Express for api routes implementation
    * Heroku for hosting services

  ### Continuous Integration
    * Travis CI & Codeclimate for test automation
    * Coveralls for test coverage report
    * Hounds CI for linting report according to Eslint
  
  ### Test-Driven Development
    * Mocha & Chai for api route testing
  
## Installation.
  * Install [Nodejs](https://nodejs.org/en/download/)
  * Clone this repo ``` git clone https://github.com/d-beloved/WEconnect.git ```
  * Run ```npm install``` to install the required dependencies
  * Run ```npm test``` to fireup the tests
  * Navigate to http://localhost:3001/


## Available API Endpoints
<table>
  <tr>
      <th>HTTP REQUEST VERB</th>
      <th>API ENDPOINT/PATH</th>
      <th>ACTION</th>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/auth/signUp</td>
      <td>Register a user</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/auth/login</td>
      <td>Login user</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/businesses</td>
      <td>Register a business</td>
  </tr>
  <tr>
      <td>PUT</td>
      <td>/api/v1/businesses/:businessId</td>
      <td>Update a business profile with the specified id</td>
  </tr>
  <tr>
      <td>DELETE</td>
      <td>/api/v1/businesses/:businessId</td>
      <td>Delete a business with the specified id</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/businesses/:businessId</td>
      <td>Get a business with the specified id</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/businesses/userBiz</td>
      <td>Get all businesses registered by a user</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/businesses</td>
      <td>Get all businesses</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/businesses/:businessId/reviews</td>
      <td>Add a review to a business</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/businesses/:businessId/reviews</td>
      <td>Get all reviews for a business</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/businesses?location=location</td>
      <td>Get businesses with a location</td>
  </tr>
  </tr>
      <td>GET</td>
      <td>/api/v1/businesses?category=category</td>
      <td>Get businesses with a category</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/businesses?category=category&location=location</td>
      <td>Get businesses with a category and location</td>
  </tr>
</table>

Check [here](https://ayo-weconnect-dummy.herokuapp.com/api-docs) for full documentation.

## License and Copyright
&copy; Ayodeji Moronkeji

Licensed under the [MIT License](LICENSE).
More details coming in soon...