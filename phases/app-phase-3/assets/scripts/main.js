PUMIEPE.route(
    "/",
    "index.hbs"
);
PUMIEPE.route(
    "/signup",
    "signup.hbs"
);
PUMIEPE.route(
    "/login",
    "login.hbs"
);
PUMIEPE.route(
    "/logout",
    "logout.hbs"
);
PUMIEPE.route(
    "/oldtimers",
    "oldtimers.hbs",
    {
        "onModel" : function () {
            return {
                "vehicles": [
                    {
                        "id": "fiat-topolino",
                        "name": "Fiat Topolino",
                        "image": "fiat-topolino.jpg",
                        "amount": 6600,
                        "currency": "USD"
                    },
                    {
                        "id": "buick-riviera",
                        "name": "Buick Riviera Super 8 Dynaflow Coupe",
                        "image": "buick-riviera.jpg",
                        "amount": 33865,
                        "currency": "USD"
                    },
                    {
                        "id": "citroen-rosalie-8",
                        "name": "Citroen Rosalie 8",
                        "image": "citroen-rosalie-8.jpg",
                        "amount": 11500,
                        "currency": "USD"
                    }
                ]
            }
        }
    }
);
PUMIEPE.route(
    "/oldtimer/:vehicle",
    "vehicle.hbs",
    {
        "onModel" : function () {
            return {
                "id": "fiat-topolino",
                "name": "Fiat Topolino",
                "image": "fiat-topolino.jpg",
                "amount": 6600,
                "currency": "USD",
                "year": 1948,
                "bodytype": "Coupe",
                "passengers": 3,
                "doors": 2,
                "color": "Red",
                "fueltype": "Petrol",
                "cc": 586,
                "cylinderlayout": "In-Line",
                "transmission": "Manual"
	    }
        }
    }
);
