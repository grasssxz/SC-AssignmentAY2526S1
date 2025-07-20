const db = require("./databaseConfig");

const productDB = {
  // Add new product
  addNewProduct: (name, description, categoryid, brand, price, callback) => {
    const dbConn = db.getConnection();
    dbConn.connect(err => {
      if (err) return callback(err, null);

      dbConn.query(`
        INSERT INTO product (name, description, categoryid, brand, price)
        VALUES (?, ?, ?, ?, ?)`,
        [name, description, categoryid, brand, price],
        (err, results) => {
          dbConn.end();
          if (err) console.log(err);
          return callback(err, results);
        });
    });
  },

  // Get product by productid
  getProduct: (productid, callback) => {
    const dbConn = db.getConnection();
    dbConn.connect(err => {
      if (err) return callback(err, null);

      dbConn.query(`
        SELECT 
          p.productid, p.name, p.description, 
          c.categoryid, category AS categoryname, 
          p.brand, p.price, 
          COUNT(DISTINCT r.reviewid) AS reviewcount, 
          MAX(pi.path) AS imagepath, 
          AVG(r.rating) AS rating, 
          d.discountid, d.discount_percentage
        FROM product p
        JOIN category c ON c.categoryid = p.categoryid  
        LEFT JOIN reviews r ON r.productid = p.productid
        LEFT JOIN productimages pi ON pi.productid = p.productid 
        LEFT JOIN discount d ON d.productid = p.productid 
        WHERE p.productid = ?
        GROUP BY p.productid, p.name, p.description, c.categoryid, c.category, p.brand, p.price, d.discountid, d.discount_percentage`,
        [productid],
        (err, results) => {
          dbConn.end();
          if (err) console.log(err);
          return callback(err, results);
        });
    });
  },

  // Get all products
  getAllProduct: (callback) => {
    const dbConn = db.getConnection();
    dbConn.connect(err => {
      if (err) return callback(err, null);

      dbConn.query(`
        SELECT 
          p.productid, p.name, p.description, 
          c.categoryid, category AS categoryname, 
          p.brand, p.price, 
          COUNT(DISTINCT r.reviewid) AS reviewcount, 
          MAX(pi.path) AS imagepath, 
          AVG(r.rating) AS rating, 
          d.discountid, d.discount_percentage
        FROM product p
        JOIN category c ON c.categoryid = p.categoryid  
        LEFT JOIN reviews r ON r.productid = p.productid
        LEFT JOIN productimages pi ON pi.productid = p.productid 
        LEFT JOIN discount d ON d.productid = p.productid 
        GROUP BY p.productid, p.name, p.description, c.categoryid, c.category, p.brand, p.price, d.discountid, d.discount_percentage`,
        [],
        (err, results) => {
          dbConn.end();
          if (err) console.log(err);
          return callback(err, results);
        });
    });
  },

  // Get all products by brand
  getAllProductByBrand: (brand, callback) => {
    const dbConn = db.getConnection();
    dbConn.connect(err => {
      if (err) return callback(err, null);

      dbConn.query(`
        SELECT 
          p.productid, p.name, p.description, 
          c.categoryid, category AS categoryname, 
          p.brand, p.price, 
          COUNT(DISTINCT r.reviewid) AS reviewcount, 
          MAX(pi.path) AS imagepath, 
          AVG(r.rating) AS rating
        FROM product p
        JOIN category c ON c.categoryid = p.categoryid  
        LEFT JOIN reviews r ON r.productid = p.productid
        LEFT JOIN productimages pi ON pi.productid = p.productid 
        WHERE p.brand = ?
        GROUP BY p.productid, p.name, p.description, c.categoryid, c.category, p.brand, p.price`,
        [brand],
        (err, results) => {
          dbConn.end();
          if (err) console.log(err);
          return callback(err, results);
        });
    });
  },

  // Delete product by ID
  deleteProduct: (productid, callback) => {
    const dbConn = db.getConnection();
    dbConn.connect(err => {
      if (err) return callback(err, null);

      dbConn.query(`DELETE FROM product WHERE productid = ?`, [productid], (err, results) => {
        dbConn.end();
        if (err) console.log(err);
        return callback(err, results);
      });
    });
  },

  // Get 3 cheapest products from a category
  get3CheapestFromCategory: (categoryid, callback) => {
    const dbConn = db.getConnection();
    dbConn.connect(err => {
      if (err) return callback(err, null);

      dbConn.query(`
        SELECT * FROM product 
        WHERE categoryid = ? 
        ORDER BY price ASC 
        LIMIT 3`,
        [categoryid],
        (err, results) => {
          dbConn.end();
          if (err) console.log(err);
          return callback(err, results);
        });
    });
  },

  // Update a product
  updateProduct: (name, description, categoryid, brand, price, productid, callback) => {
    const dbConn = db.getConnection();
    dbConn.connect(err => {
      if (err) return callback(err, null);

      dbConn.query(`
        UPDATE product SET 
          name = ?, 
          description = ?, 
          categoryid = ?, 
          brand = ?, 
          price = ?
        WHERE productid = ?`,
        [name, description, categoryid, brand, price, productid],
        (err, results) => {
          dbConn.end();
          if (err) console.log(err);
          return callback(err, results);
        });
    });
  }
};

module.exports = productDB;
