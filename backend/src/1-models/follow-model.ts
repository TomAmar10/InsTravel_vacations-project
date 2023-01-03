class FollowModel {
  public id: number;
  public vacation_id: string;
  public follower_id: string;

  public constructor(follow: FollowModel) {
    this.id = follow.id;
    this.vacation_id = follow.vacation_id;
    this.follower_id = follow.follower_id;
  }
}

export default FollowModel;
