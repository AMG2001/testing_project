const express = require("express");
const bodyParser = require("body-parser");
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

module.exports = app;

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB9ULw6e0CINlJMA92gMAJiBxjIOKE91bU",
    authDomain: "users-app-3e808.firebaseapp.com",
    projectId: "users-app-3e808",
    storageBucket: "users-app-3e808.appspot.com",
    messagingSenderId: "432576663712",
    appId: "1:432576663712:web:062c7dbb644d91631979c5"
  };
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Routes
app.get("/", (req, res) => {
    res.render("welcome_page");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", (req, res) => {
    const { first_name, last_name, user_name, password } = req.body;
    const newUser = {
      firstName: first_name,
      lastName: last_name,
      userName: user_name,
      password: password,
    };
  
    const db = firebase.firestore();
    
    db.collection('users')
      .add(newUser)
      .then((docRef) => {
        console.log('User added with ID:', docRef.id);
        res.redirect('/users'); // Redirect to the welcome page or any other page after successful login
       })
      .catch((error) => {
        console.error('Error adding user:', error);
        res.status(500).send('Error occurred while signing up');
      });
});

app.get("/login", (req, res) => {
  res.render("login");
});


app.get('/users', (req, res) => {
    const db = firebase.firestore();
  
    db.collection('users')
      .get()
      .then((querySnapshot) => {
        const users = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        res.render('users', { users });
      })
      .catch((error) => {
        console.error('Error retrieving users:', error);
        res.status(500).send('Error occurred while retrieving users');
      });
  });

app.post('/login', (req, res) => {
    const { user_name, password } = req.body;
const db = firebase.firestore();

db.collection('users')
  .where('userName', '==', user_name)
  .get()
  .then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(401).send('User not found');
    } else {
      const user = querySnapshot.docs[0].data();
      // In a real application, you should hash the password and compare the hashes
      if (user.password === password) {
        res.redirect('/users'); // Redirect to the welcome page or any other page after successful login
      } else {
        res.status(401).send('Incorrect password');
      }
    }
  })
  .catch((error) => {
    console.error('Error querying user:', error);
    res.status(500).send('Error occurred while logging in');
  });
  });

app.get("/users", (req, res) => {
    res.render("users");
});

app.delete('/delete-user/:userId', (req, res) => {
    const { userId } = req.params;
  
    const db = firebase.firestore();
  
    db.collection('users')
      .doc(userId)
      .delete()
      .then(() => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
        res.status(500).send('Error occurred while deleting user');
      });
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});