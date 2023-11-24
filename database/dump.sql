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

-- Adminer 4.8.1 PostgreSQL 16.0 (Debian 16.0-1.pgdg120+1) dump

DROP TABLE IF EXISTS "khoanthu";
CREATE TABLE khoanthu (
    makt integer NOT NULL,
    tenkt character varying(255) NOT NULL,
    sotien integer NOT NULL,
    loaikt character varying(255) NOT NULL,
    CONSTRAINT "khoanthu_makt" PRIMARY KEY ("makt")
) WITH (oids = false);


-- 2023-11-20 01:28:28.803252+00

-- Adminer 4.8.1 PostgreSQL 16.0 (Debian 16.0-1.pgdg120+1) dump

DROP TABLE IF EXISTS "nhankhau";
CREATE TABLE "public"."nhankhau" (
    "cccd" character(12) NOT NULL,
    "ten" character varying(255) NOT NULL,
    "tuoi" integer NOT NULL,
    "sdt" character(10) NOT NULL,
    "gioitinh" character varying(10) NOT NULL,
    "quequan" character varying(20) NOT NULL,
    "dantoc" character varying(20) NOT NULL,
    "tongiao" character varying(20) NOT NULL,
    "nghenghiep" character varying(20) NOT NULL,
    CONSTRAINT "nhankhau_cccd" PRIMARY KEY ("cccd")
) WITH (oids = false);

INSERT INTO "nhankhau" ("cccd", "ten", "tuoi", "sdt", "gioitinh", "quequan", "dantoc", "tongiao", "nghenghiep") VALUES
('123456789156',	'njedfn',	32,	'1234567890',	'nu',	'BacGiang',	'Kinh',	'Kinh',	'nskf'),
('123456789157',	'huy',	32,	'1234567890',	'nu',	'BacGiang',	'Kinh',	'Kinh',	'kisu');

-- 2023-11-24 02:51:18.063945+00

-- Adminer 4.8.1 PostgreSQL 16.0 (Debian 16.0-1.pgdg120+1) dump

DROP TABLE IF EXISTS "quanhe";
CREATE TABLE "public"."quanhe" (
    "maho" integer NOT NULL,
    "idthanhvien" integer NOT NULL,
    "quanhe" character varying(255) NOT NULL,
    CONSTRAINT "quanhe_pkey" PRIMARY KEY ("maho", "idthanhvien")
) WITH (oids = false);


ALTER TABLE ONLY "public"."quanhe" ADD CONSTRAINT "quanhe_idthanhvien_fkey" FOREIGN KEY (idthanhvien) REFERENCES nhankhau(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."quanhe" ADD CONSTRAINT "quanhe_maho_fkey" FOREIGN KEY (maho) REFERENCES hokhau(maho) NOT DEFERRABLE;

-- 2023-11-24 01:44:27.657289+00

-- Adminer 4.8.1 PostgreSQL 16.0 (Debian 16.0-1.pgdg120+1) dump

-- Adminer 4.8.1 PostgreSQL 16.0 (Debian 16.0-1.pgdg120+1) dump

DROP TABLE IF EXISTS "hokhau";
CREATE TABLE "public"."hokhau" (
    "maho" integer NOT NULL,
    "cccdchuho" character varying(12) NOT NULL,
    "sothanhvien" integer NOT NULL,
    "diachi" character varying(200) NOT NULL,
    CONSTRAINT "hokhau_maho_cccdchuho" PRIMARY KEY ("maho")
) WITH (oids = false);


ALTER TABLE ONLY "public"."hokhau" ADD CONSTRAINT "hokhau_cccdchuho_fkey" FOREIGN KEY (cccdchuho) REFERENCES nhankhau(cccd) NOT DEFERRABLE;

-- 2023-11-24 03:05:51.721259+00

-- Adminer 4.8.1 PostgreSQL 16.0 (Debian 16.0-1.pgdg120+1) dump

DROP TABLE IF EXISTS "noptien";
CREATE TABLE "public"."noptien" (
    "cccd" character varying(12) NOT NULL,
    "makt" integer NOT NULL,
    "sotien" integer NOT NULL,
    "ngaythu" date NOT NULL,
    CONSTRAINT "noptien_pkey" PRIMARY KEY ("cccd", "makt")
) WITH (oids = false);


ALTER TABLE ONLY "public"."noptien" ADD CONSTRAINT "noptien_cccd_fkey" FOREIGN KEY (cccd) REFERENCES nhankhau(cccd) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."noptien" ADD CONSTRAINT "noptien_makt_fkey" FOREIGN KEY (makt) REFERENCES khoanthu(makt) NOT DEFERRABLE;

-- 2023-11-24 05:16:16.171342+00