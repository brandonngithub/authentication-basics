# authentication-basics

Repo for notes and playground code while learning Passport.js

## Lesson
- Passport.js is just a middleware to help handle authentication and sessions
- Passport.js uses strategies to authenticate users (500+ strategy options)
- local strategy is just username and password
- passport.serializeUser and passport.deserializeUser just need define and no call bc passport uses in background
- middleware functions take req and res objects, manipulate them, and pass them on
- salting passwords add extra random values before passing to hash function
- salting passwords makes unique hash even if users use same passwords

## What is User Authentication? (Node + Express + Passport)
- https://youtu.be/z7872Nki5FY?si=UzwjC-7oWH8Igfs-
- authentication choices include session/local, JWT, OAuth, other/adhoc
- authentication is knowing who user is
- authorizations is who has access to what resources
- there even passport strategies for like logging in w facebook, or ig, or github, etc...
- Passport.js itself is a middleware and diff strategies are middlewares within it
- on every HTTP request passport uses a strategy to determine if a user is authorized

## HTTP Headers and Cookies
- https://youtu.be/DxeSGUM16_4?si=S7V92ZBE9WQroQkh
- network tab in inspect shows HTTP requests
- application tab in inspect shows cookies
- each HTTP request has headers
- headers three main categories general, request, response
- headers just metadata about the HTTP request
- request headers set by client, response headers set by server
- response headers set cookies
- cookies that client has is known to server via request headers

## Your complete guide to understanding the express-session library
- https://youtu.be/J1qXK66k1y4?si=0JUhFlR4b8kHLNsk
- cookies stored in browser, sessions stored in server
- sessions store a bit more data and are a bit more secure
- sessions are used to store info about a particular user moving through the browser
- sessions can get big so for prod useful to have actual db to store, default just stores in memory
- storing express-session in db pretty easy just need pass as option
- cookie in browser has session id, and use that id to link/look up session in db
- session object in req.session
- can track how many times someone visited site w sessions so maybe implement in portfolio site
