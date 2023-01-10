"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FollowModel {
    constructor(follow) {
        this.id = follow.id;
        this.vacation_id = follow.vacation_id;
        this.follower_id = follow.follower_id;
    }
}
exports.default = FollowModel;
