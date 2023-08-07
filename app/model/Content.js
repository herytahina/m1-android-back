const sql = require("../config/connection");

class Content {

	update(id, user, title, description, place, category, callback) {
		let wheres = [];
		if(user) wheres.push(`user_id=${user}`);
		if(title) wheres.push(`title='${title}'`);
		if(description) wheres.push(`description='${description}'`);
		if(place) wheres.push(`place_id=${place}`);
		if(category) wheres.push(`category_id=${category}`);
		const where = wheres.join(', ')
		const req = `UPDATE content SET ${where} WHERE id=?`;
		sql.query(req, id, (err, res, f) => {
			this.getOne(id, callback);
		});
	}

	delete(id) {
		const req = `DELETE FROM content WHERE id = ?`;
		sql.query(req, id);
	}

  getOne(id, callback) {
    const req = `SELECT * FROM content WHERE id = ${id}`;
    sql.query(req, (err, res, f) => {
      new Promise((resolve, rej) => {
        let req = `SELECT * FROM image WHERE content_id=${res[0].id}`;
        sql.query(req, (err, imgs, f) => {
          res[0].images = imgs;
          req = `SELECT * FROM video WHERE content_id=${res[0].id}`;
          sql.query(req, (err, vids, f) => {
            res[0].videos = vids;
            resolve(res[0]);
          });
        });
      }).then((c) => {
        callback({ content: c });
      });
    });
  }

  list(page, pageNumber, title, place, category, callback) {
    page = page || 1;
    let contents = {};
    // Gestion des wheres
    let wheres = [];
    if (title) wheres.push(`title like '%${title}%'`);
    if (place) wheres.push(`place_id=${place}`);
    if (category) wheres.push(`category_id=${category}`);
    let where = "";
    if (wheres.length > 0) where = "WHERE " + wheres.join(" AND ");
    // Gestion de pagination
    const limit = pageNumber || 10;
    const offset = (page - 1) * limit;
    const countReq = `SELECT count(*) count FROM content ${where}`;
    sql.query(countReq, (err, counts, f) => {
      // Get nombre des pages pour pagination
      let totalPage = Math.floor(Number(counts[0].count) / limit);
      if (Number(counts[0].count) % limit != 0) {
        totalPage = totalPage + 1;
      }
      contents.pagination = {
        page,
        pageNumber: limit,
        totalPages: totalPage,
      };
      // Get content datas
      const req = `SELECT * FROM content ${where} ORDER BY views DESC LIMIT ${limit} OFFSET ${offset}`;
      sql.query(req, (err, res, f) => {
        Promise.all(
          res.map((r, i) => {
            return new Promise((resolve, rej) => {
              let req = `SELECT * FROM image WHERE content_id=${r.id}`;
              sql.query(req, (err, imgs, f) => {
                res[i].images = imgs;
                req = `SELECT * FROM video WHERE content_id=${r.id}`;
                sql.query(req, (err, vids, f) => {
                  res[i].videos = vids;
                  resolve(res[i]);
                });
              });
            });
          })
        ).then((c) => {
          contents.contents = c;
          callback(contents);
        });
      });
    });
  }

  insert(user, title, description, place, category, images, videos, callback) {
    let contentResult;
    const req =
      "INSERT INTO content (user_id, place_id, category_id, title, description, created_at) VALUES (?, ?, ?, ?, ?, NOW())";
    sql.query(
      req,
      [user, place, category, title, description],
      (err, res, f) => {
        if (err) callback(err);
        images.forEach((image) => {
          const req = "INSERT INTO image (content_id, name) VALUES (?, ?)";
          sql.query(req, [res.insertId, image]);
        });
        videos.forEach((video) => {
          const req = "INSERT INTO video (content_id, name) VALUES (?, ?)";
          sql.query(req, [res.insertId, video]);
        });
        const req = "SELECT * FROM content WHERE id=?";
        sql.query(req, res.insertId, (err, res, f) => {
          contentResult = res[0];
          let req = "SELECT * FROM image WHERE content_id=?";
          sql.query(req, contentResult.id, (err, res, f) => {
            contentResult.images = res;
            req = "SELECT * FROM video WHERE content_id=?";
            sql.query(req, contentResult.id, (err, res, f) => {
              contentResult.videos = res;
              callback(contentResult);
            });
          });
        });
      }
    );
  }
}

module.exports = Content;
