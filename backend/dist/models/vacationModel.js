"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VacationModel = /** @class */ (function () {
    function VacationModel(vacation) {
        this.id = vacation.id;
        this.description = vacation.description;
        this.destination = vacation.destination;
        this.image = vacation.image;
        this.start = vacation.start;
        this.finish = vacation.finish;
        this.price = vacation.price;
        this.followers = vacation.followers;
    }
    return VacationModel;
}());
exports.default = VacationModel;
