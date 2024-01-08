# Getting Started with Galery app

# Server

yarn
node index.js
http://localhost:5000/swagger/

# Client

yarn
npm start
http://localhost:3000/

# Mongo if late to create docker file

brew services start mongodb/brew/mongodb-community

# Architecture

React App -> Node Service -> Mongo DB

# UI

- Any user can upload images through Admin (not implemented auth yet)
- Any user can vote on images ( no debounce, or limiting on number of votes yet)

Amazon S3 needs to be storing static images, but currently on the service uploads folder

# Docker

# Mongo part

docker pull mongo
docker run -d -p 27017:27017 --name mongodb mongo
docker ps

# Node build and run in docker

docker build -t gallery-app-image .
docker run -p 5000:5000 gallery-app-image
