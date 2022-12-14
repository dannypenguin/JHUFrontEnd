describe('signup', function() {

    var signup;
    var $httpBackend;
    var ApiBasePath;
    var partialJSONResponse = {
        "A": {
            "category": {
                "id": 82,
                "name": "Soup",
                "short_name": "A",
                "special_instructions": ""
            },
            "menu_items": [{
                    "description": "chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",
                    "large_portion_name": "quart",
                    "name": "Won Ton Soup with Chicken",
                    "price_large": 5,
                    "price_small": 2.55,
                    "short_name": "A1",
                    "small_portion_name": "pint"
                },
                {
                    "description": "chicken broth with egg drop",
                    "large_portion_name": "quart",
                    "name": "Egg Drop Soup",
                    "price_large": 4.5,
                    "price_small": 2.25,
                    "short_name": "A2",
                    "small_portion_name": "pint"
                },
                {
                    "description": "clear chicken broth with creamy corn and egg drop with white meat chicken pieces",
                    "large_portion_name": "quart",
                    "name": "Chicken Corn Soup",
                    "price_large": 5.5,
                    "price_small": 2.75,
                    "short_name": "A3",
                    "small_portion_name": "pint"
                },
                {
                    "description": "tofu, chicken, mushroom, bamboo shoot, and egg",
                    "large_portion_name": "quart",
                    "name": "Hot and Sour Soup",
                    "price_large": 5,
                    "price_small": 2.55,
                    "short_name": "A4",
                    "small_portion_name": "pint"
                },
                {
                    "description": "chicken soup with egg drop and won tons",
                    "large_portion_name": "quart",
                    "name": "Egg Drop with Won Ton Soup",
                    "price_large": 6,
                    "price_small": 3,
                    "short_name": "A5",
                    "small_portion_name": "pint"
                },
                {
                    "description": "clear broth and lo mein noodles or white rice, chicken pieces",
                    "large_portion_name": "quart",
                    "name": "Chicken Noodle (or Rice) Soup",
                    "price_large": 5,
                    "price_small": 2.55,
                    "short_name": "A6",
                    "small_portion_name": "pint"
                },
                {
                    "description": "clear chicken broth with mixed vegetables (carrots, cabbage, baby corn, mushroom, snow peas)",
                    "large_portion_name": "quart",
                    "name": "Garden Vegetable Soup",
                    "price_large": 5,
                    "price_small": 2.55,
                    "short_name": "A7",
                    "small_portion_name": "pint"
                },
                {
                    "description": "clear chicken broth with mixed vegetables (carrots, cabbage, baby corn, mushroom, snow peas) with tofu pieces",
                    "large_portion_name": "quart",
                    "name": "Garden Vegetable Soup with Tofu",
                    "price_large": 6,
                    "price_small": 3,
                    "short_name": "A8",
                    "small_portion_name": "pint"
                },
                {
                    "description": "clear chicken broth with mixed vegetables (carrots, cabbage, baby corn, mushroom, snow peas) and chicken pieces",
                    "large_portion_name": "quart",
                    "name": "Chicken with Garden Vegetable Soup",
                    "price_large": 6.4,
                    "price_small": 3.25,
                    "short_name": "A9",
                    "small_portion_name": "pint"
                },
                {
                    "description": "clear chicken broth with carrots, mushrooms, snow peas, and broccoli, and a few pieces of Hong Kong style won tons",
                    "large_portion_name": "quart",
                    "name": "Hong Kong Style Won Ton Soup",
                    "price_large": 8.5,
                    "price_small": 4.25,
                    "short_name": "A10",
                    "small_portion_name": "pint"
                },
                {
                    "description": "clear chicken broth with vegetables, veal, chicken, and beef and won tons",
                    "name": "Young Chow Won Ton Soup (for 2)",
                    "price_large": 11.95,
                    "short_name": "A11"
                }
            ]
        }
    }

    beforeEach(function() {
        module('common');

        inject(function($injector) {
            signup = $injector.get('SignUpService');
            $httpBackend = $injector.get('$httpBackend');
            ApiBasePath = $injector.get('ApiPath');
        });
    });

    it('should respond true that a menu item matches', function() {
        $httpBackend.whenGET(ApiBasePath + '/menu_items.json').respond(partialJSONResponse);
        var potentialInput = signup.getCategoryAndNumber('a11');
        var response = signup.checkItems(potentialInput.shortname, potentialInput.itemnumber, Object.keys(partialJSONResponse), partialJSONResponse)
        expect(response).toEqual({ isValid: true, itemName: "Young Chow Won Ton Soup (for 2)", itemDesc: "clear chicken broth with vegetables, veal, chicken, and beef and won tons" });
    });

    it('should respond false that a menu item does not match', function() {
        $httpBackend.whenGET(ApiBasePath + '/menu_items.json').respond(partialJSONResponse);
        var potentialInput = signup.getCategoryAndNumber('a25');
        var response = signup.checkItems(potentialInput.shortname, potentialInput.itemnumber, Object.keys(partialJSONResponse), partialJSONResponse)
        expect(response).toEqual({ isValid: false, itemName: "", itemDesc: "" });
    });




});