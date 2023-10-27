-- Adminer 4.8.1 PostgreSQL 16.0 (Debian 16.0-1.pgdg120+1) dump

DROP TABLE IF EXISTS "account";
CREATE TABLE "public"."account" (
    "email" character varying(255),
    "password" character varying(30),
    "role" character varying(30)
) WITH (oids = false);

INSERT INTO "account" ("email", "password", "role") VALUES
('kim@gmail.com',	'kim',	'leader'),
('culi@gmail.com',	'culi',	'culi');

-- 2023-10-27 00:35:58.774794+00