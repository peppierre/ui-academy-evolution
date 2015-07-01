var APP;
APP = {
    AUTHORIZATION_TOKEN : "249162d8995cd3bbc963197b2395e8f6885412fcb906bb4dc00d74a3c9a63215",
    user : null,
    validateSession : function () {
        APP.user = PUMIEPE.Session.getItem("current");
        if (APP.user !== null) {
            APP.user = JSON.parse(APP.user);
        }
        return (APP.user !== null);
    }
};
PUMIEPE.route(
    "/",
    "index.hbs"
);
PUMIEPE.route(
    "/signup",
    "signup.hbs",
    {
        "setupEventHandlers": function () {
            PUMIEPE.$("button").on(
                "click",
                function () {
                    var user;
                    user = {
                        name: PUMIEPE.$("input[name=username]").val(),
                        pwd: PUMIEPE.$("input[name=pwd]").val()
                    };
                    PUMIEPE.Persistence.setItem(
                        "user-" + user.name,
                        JSON.stringify(user)
                    );
                    PUMIEPE.Session.setItem(
                        "current",
                        JSON.stringify(user)
                    );
                    PUMIEPE.navigateTo("/oldtimers");
                }
            );
        },
        "setdownEventHandlers": function () {
            PUMIEPE.$("button").off("click");
        }
    }
);
PUMIEPE.route(
    "/login",
    "login.hbs",
    {
        "setupEventHandlers": function () {
            PUMIEPE.$("button").on(
                "click",
                function () {
                    var user, user2;
                    user = {
                        name: PUMIEPE.$("input[name=username]").val(),
                        pwd: PUMIEPE.$("input[name=pwd]").val()
                    };
                    user2 = JSON.parse(PUMIEPE.Persistence.getItem("user-" + user.name));
                    if (user2 && user2.pwd === user.pwd) {
                        PUMIEPE.Session.setItem(
                            "current",
                            JSON.stringify(user)
                        );
                        PUMIEPE.navigateTo("/oldtimers");
                    } else {
                        PUMIEPE.showError(
                            "403",
                            "Unauthorized person",
                            "Login credentials you provided are not acceptable. Please try again."
                        );
                    }
                }
            );
        },
        "setdownEventHandlers": function () {
            PUMIEPE.$("button").off("click");
        }
    }
);
PUMIEPE.route(
    "/logout",
    "logout.hbs",
    {
        "beforeModel" : function () {
            PUMIEPE.Session.removeItem("current");
        }
    }
);
PUMIEPE.route(
    "/oldtimers",
    "oldtimers.hbs",
    {
        "beforeModel": function () {
            if (!APP.validateSession()) {
                PUMIEPE.navigateTo("/login");
                return false;
            }
        },
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
        "beforeModel": function () {
            if (!APP.validateSession()) {
                PUMIEPE.navigateTo("/login");
                return null;
            }
        },
        "onModel": function (params) {
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
        },
        "afterModel": function (model) {
            var currentParkingZone;
            currentParkingZone = JSON.parse(
                PUMIEPE.Persistence.getItem(
                    "park-" + APP.user.name
                )
            );
            model.parkingzone = currentParkingZone[model._slugs[0]] || "0";
            return model;
        },
        "setupEventHandlers": function () {
            PUMIEPE.$(".parking-zone input").change(
                this,
                function (e) {
                    var currentParkingZone, parkingZoneId;
                    parkingZoneId = "park-" + APP.user.name;
                    currentParkingZone = JSON.parse(PUMIEPE.Persistence.getItem(parkingZoneId)) || {};
                    currentParkingZone[e.data.model._slugs[0]] = e.target.value;
                    PUMIEPE.Persistence.setItem(
                        parkingZoneId,
                        JSON.stringify(currentParkingZone)
                    );
                }
            );
        },
        "setdownEventHandlers": function () {
            PUMIEPE.$(".parking-zone input").off("change");
        }
    }
);
