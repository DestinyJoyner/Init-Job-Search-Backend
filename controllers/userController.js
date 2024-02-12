const express = require("express");
const users = express.Router();
const {
  getAllUsers,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
} = require("../queries/users.js");
const {
  caseConversion,
  userSchema,
} = require("../middleware/schemaValidations/userValidation.js");
const { hashPass, verifyToken } = require("../middleware/authorization.js");
const { emailValidation } = require("../middleware/emailValidation.js");
const {
  loginSchema,
} = require("../middleware/schemaValidations/loginValidation.js");
const {
  validationError,
} = require("../middleware/schemaValidations/errorValidation.js");
const { skillCheck } = require("../middleware/schemaValidations/jobValidation.js")

// Index
users.get("/", async (req, res) => {
  const allUsers = await getAllUsers();
  if (allUsers.length) {
    res.status(200).json(allUsers);
  } else {
    res.status(500).json({
      error: "Server error",
    });
  }
});

// Show 
users.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const user = await getUserByID(id);
  console.log(user)
  if (!user.message) {
    res.status(200).json(user);
  } else {
    // res.redirect("/not-found");
    res.status(500).json(user.message);
  }
});

// Create
users.post(
  "/",
  skillCheck,
  caseConversion,
  emailValidation,
  loginSchema,
  userSchema,
  validationError,
  hashPass,
  async (req, res) => {
    const newUser = await createUser(req.body);
    if (!newUser.message) {
      res.status(200).json(newUser);
    } else {
      // res.redirect("/not-found");
      res.json({ error: newUser.message });
    }
  }
);

// Update 
users.put(
  "/:id",
  skillCheck,
  caseConversion,
  userSchema,
  validationError,
  verifyToken,
  async (req, res) => {
    const { id } = req.params;
    const updatedUser = await updateUser(req.body, id);
    const updatedUserProfile = await getUserByID(id);
    if (!updatedUser.message) {
      res.status(200).json(updatedUserProfile);
    } else {
      res.status(500).json({ error: updatedUser.message });
    }
  }
);

// DELETE
users.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const deletedUser = await deleteUser(id);
  if (!deletedUser.message) {
    res.status(200).json(deletedUser);
  } else {
    res.status(500).json({ Error: deletedUser.message });
  }
});

module.exports = users;

/* 
  REQ.BODY SHAPE EXAMPLE
  ("SKILLS KEY MUST BE INCLUDED/ CAN BE EMPTY ARRAY")

  {
    "login": {
        "email": "user1@email.com",
        "password": "1Password!"
    },
    "profile":
    {
        "first_name": "Test",
        "last_name": "Mazzilli",
        "education": "Pursuit",
        "bio": "Interested in sustainability, sports analytics, and resource optimization.",
        "project_one": "",
        "project_two": ""
    },
    "skills": []

}
*/


/* {
  "login": {
      "email": "user1@email.com",
      "password": "1Password!"
  },
  "profile":
  {
      "first_name": "Destiny",
      "last_name": "Joyner",
      "education": "Pursuit",
      "bio": "A full stack web developer from Harlem, NY interested in mobile application design",
      "project" : {
          "project_name": "inIT",
          "project_link" : "https://github.com/DestinyJoyner/Init-Job-Search",
          "project_description": "inIT is a PERN STACK job search engine designed to connect employers looking to fill entry level positions with recent coding bootcamp and college program graduates, looking for their first tech opportunity."
      }
  },
  "skills": [1,2,3,8]

} */
