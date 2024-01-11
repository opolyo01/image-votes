# Starting a Service

```shell
(base) opolyakov@Olegs-MacBook-Pro-2 image-votes % cd service
(base) opolyakov@Olegs-MacBook-Pro-2 service % docker-compose up
```
You can access Swagger page
http://image-votes-service-1eca53db7d66.herokuapp.com/swagger/#/default/get_images


# Starting a Client

```shell
docker build -t my-react-app .
docker run -p 8080:80 my-react-app
```
Client is running on:
http://localhost:8080


# Architecture

React App -> Node Service -> Mongo DB

# To Do Items
- Any user can upload images through Admin (not implemented auth yet)
- Any user can vote on images ( no debounce, or limiting on number of votes yet)
- Amazon S3 needs to be storing static images, but currently on the service uploads folder
