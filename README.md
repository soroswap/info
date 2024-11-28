# info
Analytics site for Soroswap

## Configure

1. Copy the example environment file:
  ```sh
  cp .env.example .env
  ```

2. Edit the environmental variables in the `.env` file as needed.

>[!NOTE] 
> To get MERCURY_API_KEY you need to create a new account on [Mercury](https://main.mercurydata.app/) and retrieve your bearer token from the dashboard. After obtaining the bearer token, generate the API key by following the authentication process in the Mercury [documentation](https://docs.mercurydata.app/get-started-with-mercury/authentication). The POST request can be made with Postman or any API client of your choice.

3. Run the Docker setup script:
  ```sh
  bash docker/run.sh
  ```

4. Install the necessary dependencies:
  ```sh
  yarn
  ```

5. Start the development server:
  ```sh
  yarn dev
  ```

6. Open your browser and navigate to [http://localhost:3100](http://localhost:3100) to view the application.
