# CS615 Group 3 Project

The project is built using the following technologies & standards:
 - NodeJS
 - MySQL
 - REST API
 - React & Redux
 - JWT (Json Web Token)

## Running

1) Make sure you have [nodejs](https://nodejs.org//) and [npm](https://www.npmjs.com/) installed
2) Clone the project
3) Install the dependencies
    ```bash
    npm install
    ```
4) Copy file "config/db_example.json" into "config/db.json" and add credentials for the database
5) Run migrations (requires [npx](https://www.npmjs.com/package/npx) to be installed)
     ```bash
    npx sequelize-cli db:migrate
    ```
6) Build the React app
    - Go to "react" folder by executing "cd react"
    - Install the dependencies
      ```bash
      npm install
      ```
    - Copy '.env.example' into '.env' (make necessary adjustments to the '.env' file if needed)
      ```bash
      cp .env.example .env
      ```
    - Build the app
      ```bash
      npm run build
      ```
7) Come back to root folder (cd..). Launch the project (by default PORT=3000)
    ```bash
    [PORT=3000] node index.js
    ```
8) Use the following URLs to access the application:
    - http://localhost:[PORT]/ - App Home URL
    - http://localhost:[PORT]/api/v1/docs - API Documentation

9) Postman collection for the APIs used in the project.
    - https://documenter.getpostman.com/view/594558/Szmb6zY5

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate (if you can find them :wink:).

## License
[ISC](https://choosealicense.com/licenses/isc/)
