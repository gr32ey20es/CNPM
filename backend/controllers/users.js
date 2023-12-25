import db from "../db.js";

export const _create = (req, res) => {
  const {Email,Password,RoleId} = req.body;

  db.query(
    'INSERT INTO "users" ("Email", "Password", "RoleId") VALUES ($1, $2, $3)',
    [Email, Password, parseInt(RoleId)],
    (err, results) => {
      if (err) return res.status(500).json(err);
      return res.json("Thành công");
    }
  );
};

export const _read = (req, res) => {
  db.query(
    'SELECT * FROM users LEFT JOIN roles ON roles."RoleId" = users."RoleId" WHERE $1 = 0 OR "UserId" = any ($2)',
    [req.body.length,req.body],
    (error, results) => {
      if (error) res.status(500).send("Lỗi server");
      else res.json(results.rows);
    }
  );
};
 
export const _update = (req, res) => {
  const {Email,Password,RoleId, UserId } = req.body;
  console.log(Email,Password,UserId)
  db.query(
    'UPDATE "users" SET "Email" = $1,"Password" = $2, "RoleId" = $3 WHERE "UserId" = $4',
    [Email,Password,parseInt(RoleId), parseInt(UserId)],
    (error, results) => {
      if (error) res.status(500).send("Lỗi server");
      else res.send("Thành công");
    }
  );
};

export const _delete = (req,res) =>{
  console.log(req)
  db.query(
    'DELETE FROM users WHERE $1 = 0 OR "UserId" = any($2)',
    [req.body.length,req.body],
    (error, results) => {
      if (error) res.status(500).send("Lỗi server");
      else res.status(200).json("Thành công");
    }
  );
}