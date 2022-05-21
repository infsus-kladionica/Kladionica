package models

type Korisnik struct {
	ID             string  `json:"id"`
	Korisnicko_ime string  `json:"korisnicko_ime"`
	Sifra          string  `json:"sifra"`
	Saldo          float64 `json:"saldo"`
	JeAdmin bool `json:"jeAdmin"`
}

type Uplata struct {
	ID          string  `json:"id"`
	Korisnik_id string  `json:"korisnik_id"`
	Iznos       float64 `json:"iznos"`
}

type Sport struct {
	ID  string `json:"id"`
	Ime string `json:"ime"`
}

type Natjecatelj struct {
	ID  string `json:"id"`
	Ime string `json:"ime"`
}

type Dogadaj struct {
	ID              string `json:"id"`
	Naziv           string `json:"naziv"`
	Vrijeme_pocetka string `json:"vrijeme_pocetka"`
	Sport_id        string `json:"sport_id"`
	Domacin_id      string `json:"domacin_id"`
	Gost_id         string `json:"gost_id"`
}

type DogadajResponse struct {
	ID              string `json:"id"`
	Naziv           string `json:"naziv"`
	Vrijeme_pocetka string `json:"vrijeme_pocetka"`
	Sport           string `json:"sport"`
	Domacin         string `json:"domacin"`
	Gost            string `json:"gost"`
}

type Ponuda struct {
	ID         string `json:"id"`
	Dogadaj_id string `json:"dogadaj_id"`
	Naziv      string `json:"naziv"`
	Marza      string `json:"marza"`
	Završeno   string `json:"završeno"`
}

type MarketResponse struct {
	ID     string        `json:"id"`
	Naziv  string        `json:"naziv"`
	Ishodi []OddResponse `json:"ishodi"`
}

type OddResponse struct {
	ID         string  `json:"id"`
	Naziv      string  `json:"naziv"`
	Koeficijet float64 `json:"koeficijent"`
}

type Ishod struct {
	ID          string `json:"id"`
	Ponuda_id   string `json:"ponuda_id"`
	Naziv       string `json:"naziv"`
	Koeficijent float64 `json:"koeficijent"`
	Dobitan     bool `json:"dobitan"`
}

type Listic struct {
	ID          string  `json:"id"`
	Korisnik_id string  `json:"korisnik_id"`
	Uplata      int32  `json:"uplata"`
	Ishodi      []Ishod `json:"ishodi"`
}

type OddMarket struct {
	OddName      string `json:"odd_name"`
	MarketName  string `json:"market_name"`
	Koeficijent string `json:"koeficijent"`
}

type UserTicketResponse struct {
	TicketID   string      `json:"id"`
	OddMarkets []OddMarket `json:"odd_markets"`
}
