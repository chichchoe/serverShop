export class SpaceShipRequestDto {
  public id: number;
  public name: string;
  public onMission: boolean;
  public dateCreated: string;
  public captain: {
    id: number;
    name: string;
  };
}
