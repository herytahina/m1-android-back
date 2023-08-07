const sql = require("../config/connection");
const bcrypt = require("bcrypt");

class User {
  login(username, password, callback) {
    const error = new Error("Username or password incorrect");
    const req = "SELECT * FROM user WHERE username=?";
    sql.query(req, username, (err, res, f) => {
      if (err) callback(err);
      if (res.length <= 0) {
        callback(error);
      } else {
        bcrypt.compare(password, res[0].password).then((correct) => {
          if (correct) {
            callback({ user: res[0] });
          } else {
            callback(error);
          }
        });
      }
    });
  }

  signup(lastname, surname, name, username, password, type, callback) {
    let req = `SELECT * FROM user WHERE username='${username}'`;
    sql.query(req, async (err, rows, fields) => {
      if (err) callback(err);
      if (rows.length > 0) {
        callback(new Error("Username already in use"));
      } else {
        const hashedPass = await bcrypt.hash(password, 10);
        req = `INSERT INTO user (lastname, surname, name, username, password, type) values (?, ?, ?, ?, ?, ?)`;
        sql.query(
          req,
          [lastname, surname, name, username, hashedPass, type],
          (err, rows, fields) => {
            if (err) callback(err);
            req = "SELECT * FROM user WHERE id = ?";
            sql.query(req, rows.insertId, (err, res, fields) => {
              if (err) callback(err);
              callback({
                user: res[0],
              });
            });
          }
        );
      }
    });
  }
}

module.exports = User;
