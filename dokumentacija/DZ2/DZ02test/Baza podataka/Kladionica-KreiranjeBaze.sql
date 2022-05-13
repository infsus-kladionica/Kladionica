CREATE table korisnik (
	id VARCHAR(50) PRIMARY KEY,
	korisnicko_ime VARCHAR(30) NOT NULL UNIQUE,
	saldo NUMERIC NOT NULL
);
CREATE table uplata (
	id VARCHAR(50) PRIMARY KEY,
	korisnik_id VARCHAR(50) NOT NULL,
	iznos NUMERIC NOT NULL,
	CONSTRAINT fk_korisnik FOREIGN KEY (korisnik_id) REFERENCES korisnik(id)
);
CREATE table sport (
	id VARCHAR(50) PRIMARY KEY,
	ime VARCHAR(30) NOT NULL
);
CREATE table natjecatelj (
	id VARCHAR(50) PRIMARY KEY,
	ime VARCHAR(30) NOT NULL
);
CREATE table dogadaj (
	id VARCHAR(50) PRIMARY KEY,
	naziv VARCHAR(100) NOT NULL,
	vrijeme_pocetka TIMESTAMPTZ NOT NULL,
	sport_id VARCHAR(50) NOT NULL,
	domacin_id VARCHAR(50) NOT NULL,
	gost_id VARCHAR(50) NOT NULL,
	CONSTRAINT fk_sport FOREIGN KEY (sport_id) REFERENCES sport(id),
	CONSTRAINT fk_natjecatelj_domacin FOREIGN KEY (domacin_id) REFERENCES natjecatelj(id),
	CONSTRAINT fk_natjecatelj_gost FOREIGN KEY (gost_id) REFERENCES natjecatelj(id)
);
CREATE table ponuda (
	id VARCHAR(50) PRIMARY KEY,
	dogadaj_id VARCHAR(50) NOT NULL,
	naziv VARCHAR(50) NOT NULL,
	marza NUMERIC DEFAULT 0,
	završeno BOOLEAN DEFAULT FALSE NOT NULL,
	CONSTRAINT fk_dogadaj FOREIGN KEY (dogadaj_id) REFERENCES dogadaj(id)
);
CREATE table ishod (
	id VARCHAR(50) PRIMARY KEY,
	ponuda_id VARCHAR(50) NOT NULL,
	naziv VARCHAR(10) NOT NULL,
	koeficijent NUMERIC NOT NULL,
	dobitan BOOLEAN DEFAULT NULL,
	CONSTRAINT fk_ponuda FOREIGN KEY (ponuda_id) REFERENCES ponuda(id)
);
CREATE table listic (
	id VARCHAR(50) PRIMARY KEY,
	korisnik_id VARCHAR(50) NOT NULL,
	uplata NUMERIC NOT NULL,
	CONSTRAINT fk_korisnik FOREIGN KEY (korisnik_id) REFERENCES korisnik(id)
);
CREATE table listic_ishod (
	listic_id VARCHAR(50) NOT NULL,
	ishod_id VARCHAR(50) NOT NULL,
	PRIMARY KEY (listic_id, ishod_id),
	CONSTRAINT fk_listic FOREIGN KEY (listic_id) REFERENCES listic(id),
	CONSTRAINT fk_ishod FOREIGN KEY (ishod_id) REFERENCES ishod(id)
);