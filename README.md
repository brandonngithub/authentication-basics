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
- <mark>can track how many times someone visited site w sessions so maybe implement in portfolio site</mark>

## What is Express middleware and how does it work? (in-depth)
- https://youtu.be/AZDTM0DiLG8?si=VH0e8GNc4sy3lGe8
- basically everything in express is middleware, even routes
- app.use is just middleware that all routes use
- error handler middlewares take (err, req, res, next)
- error handler middleware usually last to catch errors at end bc middleware order matters
- can pass errors through middlewares w next(errObj)
- skips other middlewares and goes straight to first error handler if errorObj passed

## Passport Local Configuration (Node + Passport + Express)
- https://youtu.be/xMEOT9J0IvI?si=OZysbNh4LH8VpepE
- passport.use() configures strategy
- passport.use() takes strategy, strategy takes verify callback
- verify callback just own implementation of password verification
- passport.authenticate() middleware specifies which configured strategy want use
- <mark>separate passport logic in passport.js like youtuber did in this vid and maybe password encryption stuff in members_only</mark>
- <mark>use session store in members_only</mark>
- this vid use crypto to encrypt passwords but we use bcrypt

## Passport Local Strategy Usage (Node + Passport + Express)
- https://youtu.be/fGrSmBk9v-4?si=sTld-rfd6xaMCNDX
- passport.serializeUser() stores stuff in req.session.passport.user
- passport.deserializeUser() gets whatever was stored by serialize and for ex if userId then get whole user object from db and stores in req.user for use
- req.logout() deletes req.session.passport.user property
- isAuthenticated() basically just checks if req.session.passport.user exists and not null
- <mark>maybe add authMiddleware for isAuth and isAdmin in members_only like youtuber</mark>
