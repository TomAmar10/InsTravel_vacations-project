class VacationModel {
  public id: number;
  public description: string;
  public destination: string;
  public image: string;
  public start: Date;
  public finish: Date;
  public price: number;
  public followers: number;

  public constructor(vacation: VacationModel) {
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

export default VacationModel;
