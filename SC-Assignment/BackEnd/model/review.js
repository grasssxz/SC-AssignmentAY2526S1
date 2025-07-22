

const db = require("./databaseConfig");

const reviewDB = {
  addReview: (userid, rating, review, productid, callback) => {
    const dbConn = db.getConnection();

    dbConn.connect(function (err) {
      if (err) {
        return callback(err, null);
      } else {
        const sql = `
          INSERT INTO reviews (userid, rating, review, productid)
          VALUES (?, ?, ?, ?);
        `;

        dbConn.query(sql, [userid, rating, review, productid], function (err, results) {
          dbConn.end();

          if (err) console.log(err);

          return callback(err, results);
        });
      }
    });
  },


  //Retrieves all the reviews of a particular product
  getProductReview: (productid, callback) => {

    //Connects
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {

      //Return error
      if (err) {

        return callback(err, null)

      } else {

        //Sql query
        dbConn.query(`
        select reviewid, productid, u.userid, username, rating, review, r.created_at
        from reviews r, user u 
        where productid=?
        and r.userid = u.userid;`, [productid], function (err, results) {

          //End connection
          dbConn.end();

          if (err)
            console.log(err)

          return callback(err, results)
        });

      }

    });


  },

  //Delete Review
  deleteReview: (reviewid, userid, callback) => {

    //Connects
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {

      //Return error
      if (err) {

        return callback(err, null)

      } else {

        //Sql query
        dbConn.query(`delete from reviews where reviewid = ${reviewid} and userid = ${userid};`, [], function (err, results) {

          //End connection
          dbConn.end();

          if (err)
            console.log(err)

          return callback(err, results)
        });

      }

    });


  },

};

module.exports = reviewDB;