# authentication-basics

Repo for notes and playground code while learning Passport.js

### top
- Passport.js is just a middleware to help handle authentication and sessions
- Passport.js uses strategies to authenticate users (500+ strategy options)
- local strategy is just username and password
- passport.serializeUser and passport.deserializeUser just need define and no call bc passport uses in background
- middleware functions take req and res objects, manipulate them, and pass them on
- salting passwords add extra random values before passing to hash function
- salting passwords makes unique hash even if users use same passwords
