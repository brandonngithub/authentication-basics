const express = require("express");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("passport-local");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const path = require("node:path");
const { Pool } = require("pg");

dotenv.config();
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const pool = new Pool({
    connectionString: process.env.PSQL_CONNECTION_STRING
});

passport.use(
    new passportLocal.Strategy(async (username, password, done) => {
        try {
            const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
            const user = rows[0];
    
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect password" })
            }

            return done(null, user);
        } catch(err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        const user = rows[0];
        done(null, user);
    } catch(err) {
        done(err);
    }
});

app.use(session({ secret: process.env.SESSION_KEY, resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});  

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/sign-up", (req, res) => {
    res.render("sign-up-form");
});

app.post("/sign-up", async (req, res, next) => {
    try {
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) reject(err);
                else resolve(hash);
            });
        });
        await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
            req.body.username,
            hashedPassword,
        ]);
        res.redirect("/");
    } catch(err) {
        return next(err);
    }
});

app.post("/log-in", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    })
);

app.get("/log-out", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
});  

app.listen(3000, () => console.log("Server running on port 3000"));
