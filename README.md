# WEconnect
[![Build Status](https://travis-ci.org/d-beloved/WEconnect.svg?branch=development)](https://travis-ci.org/d-beloved/WEconnect)
[![Coverage Status](https://coveralls.io/repos/github/d-beloved/WEconnect/badge.svg?branch=development)](https://coveralls.io/github/d-beloved/WEconnect?branch=development)
[![Maintainability](https://api.codeclimate.com/v1/badges/81369faf28a735ae202b/maintainability)](https://codeclimate.com/github/d-beloved/WEconnect/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/81369faf28a735ae202b/test_coverage)](https://codeclimate.com/github/d-beloved/WEconnect/test_coverage)

WeConnect provides a platform that brings businesses and individuals together.

This platform creates awareness for businesses and gives the users the ability to write reviews about the
businesses they have interacted with.

The static version of WEconnect app can be accessed on [github pages](https://d-beloved.github.io/WEconnect/template).

The first release of the app using in-memory/dummy data is hosted on [heroku](https://ayo-weconnect-dummy.herokuapp.com/).

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


## Available APIs
- API route that welcomes users to the application
  * GET : ```/```

- API routes for users to signup and login to the application
  * POST : ```/api/v1/auth/signup```  (firstName, lastName, email, password)
  * POST : ```/api/v1/auth/login``` (email, password)

- An API route that allow users to add a business
  * POST : ```/api/v1/businesses```

- An API route that allow users to modify a Business
  * PUT : ```/api/v1/businesses/<businessId>```

- An API route that allow users to delete a Business
  * DELETE : ```/api/v1/businesses/<businessId>```

- An API route that allow users to gets all available Businesses in the app
  * GET : ```/api/v1/businesses```

- An API route that allow users to gets more details on a particualar business
  * GET : ```/api/v1/businesses/<businessId>```

- An API route that allow users to gets all available Businesses in the app by their location
  * GET : ```/api/v1/businesses?location=<location>```

- An API route that allow users to gets all available Businesses in the app by their category
  * GET : ```/api/v1/businesses?category=<category>``

- An API route that allow users to add new reviews to a business
  * POST : ```/api/v1/businesses/<businessId>/reviews```

- An API route that allow users to get all the reviews for a business
  * GET : ```/api/v1/businesses/<businessId>/reviews```


Check [here](https://ayo-weconnect-dummy.herokuapp.com/api-docs) for full documentation.

## License and Copyright
&copy; Ayodeji Moronkeji

Licensed under the [MIT License](LICENSE).


More details coming in soon...