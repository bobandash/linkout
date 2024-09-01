# Linkout
A full-stack chat application that allows users to create and join communities chat within those communities, and direct message other users.

## Live View:
[https://linkingout.netlify.app/](https://linkingout.netlify.app/)

Note: The application may take a few seconds to render because I am hosting the backend on a free PaaS that spins down with inactivity

## Preview:
![image](https://github.com/bobandash/linkout/assets/74850332/24835838-70d7-4563-8196-009a820bf8ba)
![image](https://github.com/bobandash/linkout/assets/74850332/03569857-76e8-451c-a909-0ea5bbe30b65)

## Instructions to Run Locally
### Note: Before beginning setup, you would need to create an AWS account and retrieve your own AWS keys to store images on AWS, and a MongoDB database url
1. Clone the repository
    ```sh
    git clone https://github.com/bobandash/linkout.git
    ```
2. Open two instances of your terminal - one to run the server and one to run the client
    ```sh
    cd linkout/client
    cd linkout/server
    ```
-  **The following steps (3 - 7) will reference the server terminal.**
3. Install all the dependencies on the server's package.json
    ```sh
    npm install
    ```
4. Create an .env file at the server directory
    ```sh
    touch .env
    ```
5. Copy and paste the .env.sample contents into the .env file
6. With the .env file you created, populate the file with your database and AWS credientials (the secret token is for signing your JWT token)
7. Start up the server on your local machine (this uses nodemon to listen to any server changes)
    ```sh
    npm run devStart
    ```
-  **The following steps (8 - 9) will reference the client terminal.**
8. Install all the dependencies with a package manager of your choice
    ```sh
    npm install
    ```
9. Install all the dependencies with a package manager of your choice
    ```sh
    npm run dev
    ```

## Relevant Technologies Used:
Front-End:
- Framework: React
- Language: Typescript
- Important NPM Libraries: TailwindCSS, Axios
  
Backend:
- Framework: Express
- Language: Javascript
- Database: MongoDB
- Important NPM Libraries: Socket.io, JWT, Multer, AWS-SDK for image hosting

## Concepts Learned
- Sending and accessing JWT tokens through HTTP-only cookies
- Styling components using TailwindCSS
- Image hosting using AWS S3
- Real-time chat and updates using socket.io

## To-Do:
If I were to come back to this project in the future, I would want to:
- Add features such as:
- Ability to edit community names
- Create more profile fields
- Refactor the date to display in client's timezone (call date on client side instead of virtual property in backend)
- Create a Linkout feature: similar to dating apps where you can view each user's profile in the community
- Change the UI colors to not match Discord
- Add testing
- Add user authorization with Google and LinkedIn
