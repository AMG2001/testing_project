// routes.js
const firebase = require("firebase/app");
require("firebase/firestore");

exports.signup = (req, res) => {
  const { first_name, last_name, user_name, password } = req.body;
  const newUser = {
    firstName: first_name,
    lastName: last_name,
    userName: user_name,
    password: password,
  };

  const db = firebase.firestore();

  db.collection("users")
    .add(newUser)
    .then((docRef) => {
      console.log("User added with ID:", docRef.id);
      res.redirect("/users");
    })
    .catch((error) => {
      console.error("Error adding user:", error);
      res.status(500).send("Error occurred while signing up");
    });
};