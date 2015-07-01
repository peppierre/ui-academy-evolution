var APP;
APP = {
    AUTHORIZATION_TOKEN : "249162d8995cd3bbc963197b2395e8f6885412fcb906bb4dc00d74a3c9a63215"
};
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
        "onModel": function (params) {
            return Promise.resolve(
                PUMIEPE.$.ajax(
                    "https://pumiepe-ui-academy.cornerstore.io/api/v1/products",
                    {
                        "type" : "get",
                        "headers" : {
                            "Authorization" : "Token " + APP.AUTHORIZATION_TOKEN
                        }
                    }
                )
            );
        },
        "afterModel": function (model) {
            return {
                "vehicles": model
            }
        }
    }
);
PUMIEPE.route(
    "/oldtimer/:vehicle",
    "vehicle.hbs",
    {
        onModel: function (params) {
            return Promise.resolve(
                PUMIEPE.$.ajax(
                    "https://pumiepe-ui-academy.cornerstore.io/api/v1/products/" + params.vehicle,
                    {
                        "type" : "get",
                        "headers" : {
                            "Authorization" : "Token " + APP.AUTHORIZATION_TOKEN
                        }
                    }
                )
            );
        }
    }
);
