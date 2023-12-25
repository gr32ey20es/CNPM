import db from "../db.js";

export const _create = (req, res) => {
  const {mahokhau,makhoanthu,sotiendanop,ngaynop} = req.body;
  console.log(mahokhau,makhoanthu,sotiendanop,ngaynop)
  db.query(
    'INSERT INTO "noptien" ("mahokhau", "makhoanthu", "sotien","ngaynop") VALUES ($1, $2, $3, $4)',
    [mahokhau, parseInt(makhoanthu), parseInt(sotiendanop), ngaynop],
    (err, results) => {
      if (err) return res.status(500).json(err);
      return res.json("Thành công");
    }
  );
};

export const _read = (req, res) => {
  db.query(
    'SELECT * FROM noptien WHERE $1 = 0 OR id = any ($2)',
    [req.body.length,req.body],
    (error, results) => {
      if (error) res.status(500).send("Lỗi server");
      else res.json(results.rows);
    }
  );
};
 
export const _update = (req, res) => {
  const {sotiendanop,ngaynop,id } = req.body;
  db.query(
    'UPDATE "noptien" SET "sotien" = $1,"ngaynop" = $2 WHERE "id" = $3',
    [parseInt(sotiendanop),ngaynop,parseInt(id)],
    (error, results) => {
      if (error) res.status(500).send("Lỗi server");
      else res.send("Thành công");
    }
  );
};

export const _delete = (req,res) =>{
  db.query(
    'DELETE FROM "noptien" WHERE $1 = 0 OR id = any($2)',
    [req.body.length,req.body],
    (error, results) => {
      if (error) res.status(500).send("Lỗi server");
      else res.status(200).json("Thành công");
    }
  );
}

/*
  SELECT noptien.id, hokhau.*, noptien.makhoanthu, noptien.sotien sotiendanop, noptien.ngaynop 
  FROM noptien
	FULL OUTER JOIN hokhau 
	ON noptien.mahokhau = hokhau.mahokhau
*/
export const _statistics = (req, res) => {
	db.query(
    'SELECT noptien.id, hokhau.*, noptien.makhoanthu, noptien.sotien sotiendanop, noptien.ngaynop ' +
    'FROM noptien ' + 
    'RIGHT JOIN hokhau ' +  
    'ON noptien.mahokhau = hokhau.mahokhau ',
		(error, results) => {
			if (error) return res.status(500).json(error);
			return res.status(200).json(results.rows);
		}
	);
}
  