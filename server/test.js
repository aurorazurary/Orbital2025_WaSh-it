const bcrypt = require("bcryptjs");

const password = "password123";
const hash = "$2b$10$f8xyjheiTqWzEfZaN4gTWOuK1bObnFHDi46BqnyumZJ/t8uGHUWS."; // replace with one from your DB

bcrypt.compare(password, hash).then(result => {
    console.log("Compare result:", result);
});
