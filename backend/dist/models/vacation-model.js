"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VacationModel {
    constructor(vacation) {
        this.id = vacation.id;
        this.description = vacation.description;
        this.destination = vacation.destination;
        this.image = vacation.image;
        this.start = vacation.start;
        this.finish = vacation.finish;
        this.price = vacation.price;
        this.followers = vacation.followers;
    }
}
exports.default = VacationModel;
