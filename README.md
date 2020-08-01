# CheckIdeas-webservice

## What is this ?

CheckIdeas is a web service built entirely in JavaScript (Node JS) using tools such as babel to implement ES6 syntax and a connection to a mongoDB database. This project consists in the development of a "checklist" system where users can register their tasks and mark with a "Check" those that are complete

## Development information

### Scripts

```
- dev = run server in port 3000. Use for development environment
- build = generate dist folder with older js syntax using babel
- start = run the service in production.
```

The start script has an assignment to the NODE_ENV environment wand where the value "production" is assigned. However, there is a problem when this script runs on window systems because the SET prefix is missing before assigning the value. That is, if you are in a window system you must set the following: SET NODE_ENV=production and you are in linux you should not make any changes

### Environment Variable

```
The .env.example file contains the model of the environment variables used in this
project. Please note that a mongoDB database is required for its operation
```

## API Documentation

```
https://app.swaggerhub.com/apis-docs/camilo_JTG/CheckIdeas/1.0.0
```

## URL api server

```
https://checkideas-webservice.herokuapp.com/
```

## How use ?

1. If you don't have an account created in the app. You will have to create one by asking the api POST users.

```
{
  "username": "string",
  "mail": "string",
  "password": "string"
}
```

2. Once you have an account, you must consult the POST AUTH endpoint so that the api responds with a token that will be used
   to consult the other methods, always using the token provided.

```
{
  "mail": "string",
  "password": "string"
}
```

3. View the api documentation for more information
