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
            return Promise.resolve(
                PUMIEPE.$.ajax(
                    "/models/oldtimers.json",
                    {
                        "type" : "get"
                    }
                )
            );
        }
    }
);
PUMIEPE.route(
    "/oldtimer/:vehicle",
    "vehicle.hbs",
    {
        "onModel" : function (params) {
            return Promise.resolve(
                PUMIEPE.$.ajax(
                    "/models/oldtimer-" + params.vehicle + ".json",
                    {
                        "type" : "get"
                    }
                )
            );
        }
    }
);
