const url = require("url");

const Content = require("../model/Content");
const User = require("../model/User");

module.exports = function (router) {
  // content
  router
    .route("/contents/:id")
    .get((req, res) => {
      const id = req.params.id;
      new Content().getOne(id, (content) => {
        if (content instanceof Error) {
          res.status(400).json({ error: content.message });
        } else {
          res.json(content);
        }
      });
    })
    .put((req, res) => {
      const id = req.params.id;
      new Content().update(
        id,
        req.body.user_id,
        req.body.title,
        req.body.description,
        req.body.place_id,
        req.body.category_id,
        (content) => {
          if (content instanceof Error) {
            res.status(400).json({ error: content.message });
          } else {
            res.json(content);
          }
        }
      );
    })
    .delete((req, res) => {
      const id = req.params.id;
      new Content().delete(id);
    });

  router
    .route("/contents")
    .get((req, res) => {
      let query = url.parse(req.url, true).query;
      new Content().list(
        query.page,
        query.pageNumber,
        query.title,
        query.place_id,
        query.category_id,
        (contents) => {
          if (contents instanceof Error) {
            res.status(400).json({ error: contents.message });
          } else {
            res.json(contents);
          }
        }
      );
    })
    .post((req, res) => {
      new Content().insert(
        req.body.user_id,
        req.body.title,
        req.body.description,
        req.body.place_id,
        req.body.category_id,
        req.body.images,
        req.body.videos,
        (content) => {
          if (content instanceof Error) {
            res.status(400).json({ error: content.message });
          } else {
            res.json(content);
          }
        }
      );
    });

  // users
  router.post("/users/login", (req, res) => {
    new User().login(req.body.username, req.body.password, (user) => {
      if (user instanceof Error) {
        res.status(400).json({ error: user.message });
      } else {
        res.json(user);
      }
    });
  });

  router.route("/users").post((req, res) => {
    new User().signup(
      req.body.lastname,
      req.body.surname,
      req.body.name,
      req.body.username,
      req.body.password,
      req.body.type,
      (user) => {
        if (user instanceof Error) {
          res.status(400).json({ error: user.message });
        } else {
          res.json(user);
        }
      }
    );
  });

  // version
  router.get("/version", (req, res) => {
    res.json({ version: "0.0.1" });
  });

  return router;
};
