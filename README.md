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
- Open your terminal in your IDE of choice
- Clone the repository - "git clone https://github.com/bobandash/linkout.git"
- Change the working directory to the cloned repo - "cd linkout"
- Open two instances of your terminal - one to run the server and one to run the client
- For the server terminal, run the following commands:
  - Change the working directory to server - "cd server"
  - Install all the dependencies with a package manager of your choice - "npm install" or "yarn install"
  - Create an .env file at the server directory - "touch .env", or just create the .env file using your IDE
  - Copy and paste the .env.sample's contents into the .env file
  - Populate the .env file with your database and AWS credientials (the secret token is for signing your JWT token)
  - Run the server - "npm run devStart" (this uses nodemon to listen to any server changes)
- For the client terminal, run the following commands:
  - Change the working directory to client - "cd client"
  - Install all the dependencies with a package manager of your choice - "npm install" or "yarn install" 
  - Run the client - "npm run dev"


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
