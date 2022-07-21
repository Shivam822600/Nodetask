var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

/* GET home page. */
router.get("/gettingStarted", function (req, res, next) {
  res.render("start", { title: "Express" });
});
router.get("/detailsInput", function (req, res, next) {
  res.render("details", { title: "Express" });
});

router.get("/fetchAllStates", function (req, res) {
  pool.query("select * from states", function (error, result) {
    if (error) {
      console.log(error);
      res.status(500).json([]);
    } else {
      console.log(result);
      res.status(200).json(result);
    }
  });
});
router.get("/fetchAllCities", function (req, res) {
  pool.query(
    "select * from cities where stateid=?",
    [req.query.stateid],
    function (error, result) {
      if (error) {
        res.status(500).json([]);
      } else {
        res.status(200).json(result);
      }
    }
  );
});
router.post(
  "/insertDetails",
  upload.single("picture"),
  function (req, res, next) {
    var name = req.body.firstname + " " + req.body.lastname;
    pool.query(
      "insert into details(salut,personname,gender,fathername,birthdate,thpassyr,twhpassyr,thboard,twhboard,thper,twhper,gradper,gradyr,graduniv,gradcgpa,mobile,email,stateid,cityid,skills,temptype,picture) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        req.body.salut,
        name,
        req.body.gender,
        req.body.fathername,
        req.body.birthdate,
        req.body.thpassyr,
        req.body.twhpassyr,
        req.body.thboard,
        req.body.twhboard,
        req.body.thper,
        req.body.twhper,
        req.body.gradper,
        req.body.gradyr,
        req.body.graduniv,
        req.body.gradcgpa,
        req.body.mobile,
        req.body.email,
        req.body.state,
        req.body.city,
        req.body.skills,
        req.body.temptype,
        req.file.originalname,
      ],
      function (error, result) {
        if (error) {
          console.log(error);
          res.render("details", { result: 0 });
        } else {
          res.render("details", { result: 1 });
        }
      }
    );
  }
);

router.get("/fetchResume", function (req, res, next) {
  q =
    "select S.*,(select ST.statename from states ST where ST.stateid=S.stateid) as statename,(select C.cityname from cities C where C.cityid=S.cityid) as cityname from details S";
  pool.query(q, function (error, result) {
    console.log(result);

    if (error) {
      res.render("displayresume", { result: [] });
    } else {
      res.render("displayresume", { result: result });
    }
  });
});
router.get("/displayById", function (req, res, next) {
  q =
    "select S.*,(select ST.statename from states ST where ST.stateid=S.stateid) as statename,(select C.cityname from cities C where C.cityid=S.cityid) as cityname from details S where personid=?";
  pool.query(q, [req.query.personid], function (error, result) {
    if (error) {
      res.render("displaybyid", { result: [] });
    } else {
      console.log(result);

      res.render("displaybyid", { result: result[0] });
    }
  });
});

router.get("/editDeletRecord", function (req, res, next) {
  if (req.query.btns == "Edit") {
    var name = req.query.firstname + " " + req.query.lastname;
    q =
      "update details set salut=?,personname=?,gender=?,fathername=?,birthdate=?,thpassyr=?,twhpassyr=?,thboard=?,twhboard=?,thper=?,twhper=?,gradper=?,gradyr=?,graduniv=?,gradcgpa=?,mobile=?,email=?,stateid=?,cityid=?,skills=?,temptype=? where personid=?";
    console.log(q);
    pool.query(
      q,
      [
        req.query.salut,
        name,
        req.query.gender,
        req.query.fathername,
        req.query.birthdate,
        req.query.thpassyr,
        req.query.twhpassyr,
        req.query.thboard,
        req.query.twhboard,
        req.query.thper,
        req.query.twhper,
        req.query.gradper,
        req.query.gradyr,
        req.query.graduniv,
        req.query.gradcgpa,
        req.query.mobile,
        req.query.email,
        req.query.state,
        req.query.city,
        req.query.skills,
        req.query.temptype,
        req.query.personid,
      ],

      function (error, result) {
        
        console.log(error);
        if (error) {
          res.redirect("/resume/fetchResume");
        } else {
          console.log(error);
          res.redirect("/resume/fetchResume");
        }
      }
    );
  } else {
    q = "delete from details where personid=?";
    pool.query(q, [req.query.personid], function (error, result) {
      if (error) {
        console.log(error);
        res.redirect("/resume/fetchResume");
      } else {
        console.log(error);
        res.redirect("/resume/fetchResume");
      }
    });
  }
});

router.get("/displayPicture", function (req, res) {
  res.render("displaypicture", {
    picture: req.query.picture,
    personid: req.query.personid,
  });
});

router.post("/editPicture", upload.single("picture"), function (req, res) {
  q = "update details set picture=? where personid=?";
  pool.query(
    q,
    [req.file.originalname, req.body.personid],
    function (error, result) {
      console.log(error)
      if (error) {
        console.log(error)
        res.redirect("/resume/fetchResume");
      } else {
        res.redirect("/resume/fetchResume");
      }
    }
  );
});





module.exports = router;
