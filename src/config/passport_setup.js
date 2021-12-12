const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");

const User = require("../services/user");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log(id);

    const user = await User.findById(id);
    done(null, user);
});

passport.use(
    new GoogleStrategy(
        {
            // options for google strategy
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
            callbackURL: "/auth/google/redirect",
        },
        async (accessToken, refreshToken, profile, done) => {
            const currentUser = await User.findOne({ googleId: profile.id });

            if (currentUser) {
                // already have this user
                // console.log("user is: ", currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db

                const userobj = { user_id: profile.id, name: profile.displayName, email: profile._json.email, thumbnail: profile._json.picture };
                const newUser = await User.newUser(userobj);
                done(null, newUser);
            }
        }
    )
);
