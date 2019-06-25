export class AttackType {
  public attackMessage: string;
  public attackType: string;
  constructor() {}
}

export enum AttackTypeEnum {
  PUNCH = "punch",
  KICK = "kick",
  POWER = "power",
}
