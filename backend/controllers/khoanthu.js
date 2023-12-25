import db from "../db.js";

export const _read = (req, res) => {
	db.query(
		'SELECT * FROM khoanthu WHERE $1 = 0 OR id = ANY ($2)',
		[req.body.length,req.body],
		(error, results) => {
			if (error) return res.status(500).json(error);
			return res.json(results.rows);
		}
	);
};
export const _create = (req, res) => {
  const {ten,loai,sotien} = req.body;
	db.query(
		'INSERT INTO "khoanthu" ("ten", "loai", "sotien") VALUES ($1, $2, $3)',
		[ten,loai,parseInt(sotien)],
		(error, results) => {
			if (error) return res.status(500).json(error);
			return res.json("Thành công");
		}
	);
};

/*
SELECT khoanthu.*, COALESCE(tong, 0) tong, COALESCE(danop, 0) danop, (SELECT COUNT(*) FROM hokhau) - COALESCE(danop, 0) chuanop
FROM (
    SELECT makhoanthu, SUM (sotien) tong, count(sotien) as danop
    FROM noptien
    GROUP BY makhoanthu
    ORDER BY makhoanthu
)
RIGHT JOIN khoanthu
ON makhoanthu = id
*/

export const _statistics = (req, res) => {
	db.query(
		'SELECT khoanthu.*, COALESCE(tong, 0) tong, COALESCE(danop, 0) danop, (SELECT COUNT(*) FROM hokhau) - COALESCE(danop, 0) chuanop ' +
		'FROM ( ' +
		'SELECT makhoanthu, SUM (sotien) tong, count(sotien) as danop ' +
		'FROM noptien ' +
		'GROUP BY makhoanthu ' +
		'ORDER BY makhoanthu ) ' +
		'RIGHT JOIN khoanthu ' +
		'ON makhoanthu = id ' +
		'WHERE $1 = 0 OR id = ANY($2)',
		[req.body.length,req.body],
		(error, results) => {
			if (error) return res.status(500).json(error);
			return res.json(results.rows);
		}
	);
};

export const _update = (req, res) => {	
  const {ten,loai,sotien,id} = req.body
	db.query(
		'UPDATE "khoanthu" SET "ten" = $1,"loai" = $2,"sotien" = $3 WHERE "id" = $4',
		[ten,loai,parseInt(sotien),parseInt(id)],
		(error, results) => {
			if (error) return res.status(500).json(error);
			return res.send("Thành công");
		}
	);
};
  
export const _delete = (req, res) => {
	db.query(
		'DELETE FROM "noptien" WHERE $1 = 0 OR makhoanthu = any($2)',
		[req.body.length,req.body],
		(error, results) => {
			if (error) return res.status(500).send("Lỗi server");
			db.query(
				'DELETE FROM "khoanthu" WHERE $1 = 0 OR id = any($2)',
				[req.body.length,req.body],
				(error, results) => {
					if (error) return res.status(500).json(error);
					return res.status(200).json("Thành công");
				}
			);
		}
	);
}