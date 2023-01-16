"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FollowModel = /** @class */ (function () {
    function FollowModel(follow) {
        this.id = follow.id;
        this.vacation_id = follow.vacation_id;
        this.follower_id = follow.follower_id;
    }
    return FollowModel;
}());
exports.default = FollowModel;
