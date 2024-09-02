# Linkout
A full-stack chat application that allows users to create and join communities chat within those communities, and direct message other users.

## Built With
Front-End:
- Framework: React
- Language: Typescript
- Important NPM Libraries: TailwindCSS, Axios
  
Backend:
- Framework: Express
- Language: Javascript
- Database: MongoDB
- Important NPM Libraries: Socket.io, JWT, Multer, AWS-SDK for image hosting

## Live View:
[https://linkingout.netlify.app/](https://linkingout.netlify.app/)

## Preview:
![image](https://github.com/bobandash/linkout/assets/74850332/24835838-70d7-4563-8196-009a820bf8ba)
![image](https://github.com/bobandash/linkout/assets/74850332/03569857-76e8-451c-a909-0ea5bbe30b65)

## Getting Started
To get a local copy up and running follow these simple steps.
### Prerequisites
Before beginning setup, you would need to create an AWS account with [AWS keys](https://medium.com/@jannden/how-to-get-aws-access-keys-81cad0366418) and an [S3 Bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-bucket.html) and a [MongoDB database](https://www.mongodb.com/resources/products/fundamentals/create-database)

### Steps to run on your local machine
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
9. Start the application and open the dev link!
    ```sh
    npm run dev
    ```

## Concepts Learned
- Sending and accessing JWT tokens through HTTP-only cookies
- Styling components using TailwindCSS
- Image hosting using AWS S3
- Real-time chat and updates using Socket.io

## To-Do:
If I were to come back to this project in the future, I would want to:
- Add features such as:
- Add OAuth2 with LinkedIn and Google
- Ability to edit community names
- Notification system with webhooks
- Refactor the date to display in client's timezone (call date on client-side instead of virtual property in thebackend)
- Create a Linkout feature: similar to dating apps where you can view each user's profile in the community
- Add unit, integration, and E2E testing

## Contact
Bruce Hsu - brucehsu1126@gmail.com
