var express = require("express");
var router = express.Router();
var pool = require("./pool");

router.get("/resumeLogin", function (req, res, next) {
  res.render("adminlogin", { msg: " " });
});

router.post("/checkAdminLogin", function (req, res, next) {
    console.log(req.body)
  pool.query(
    "select * from admins where emailid=? and password=?",
    [req.body.emailid, req.body.psw],
    function (error, result) {
      if (error) {
          console.log("Error",error)
        res.render("adminlogin", { msg: "Server Error..." });
      } 
      
      else {
          console.log("mmmm",result)
        if (result.length == 1) {
          res.render("dashboard");
        } else {
            console.log("mkkkk",result)
          res.render("adminlogin", { msg: "Invaled Emailid/Password..." });
        }
      }
    }
  );
 
});

module.exports = router;
