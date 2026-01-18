const express = require("express");
const router = express.Router();
const {
  getAllpersons,
  getPerson,
  updatePerson,
  deletePerson,
  createNewPerson,
} = require("../../controllers/personCotroller"); // import controllers using commonJS module

const USER_ROLE = require("../../config/user_role");
const verifyRoles = require("../../middleware/verifyRole");

//route of all data
router
  .route("/")
  .get(getAllpersons)
  .post(
    verifyRoles(USER_ROLE.Admin, USER_ROLE.User, USER_ROLE.Encoder),
    createNewPerson
  )
  .patch(verifyRoles(USER_ROLE.Admin, USER_ROLE.User), updatePerson)
  .delete(verifyRoles(USER_ROLE.Admin), deletePerson);

router.route("/:id").get(getPerson);

module.exports = router;
