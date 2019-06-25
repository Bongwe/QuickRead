import {AttackType, AttackTypeEnum} from '../models/AttackType';

export function getAttackType(playerName: string, opponentName: string): AttackType{
  let attackTypes: Array<AttackType> = generateAttackType(playerName, opponentName);
  let randNum = Math.floor((Math.random() * 5) + 0); //Return a random number between 0 (inclusive) and 1 (exclusive):
  console.log(randNum);
  return attackTypes[randNum];
}

function generateAttackType(playerName: string, opponentName: string): Array<AttackType>{
  let attackTypes: Array<AttackType> = [];
  let player: string = playerName;
  let opponent: string = opponentName;

  //kick
  let kick1 = new AttackType();
  let kick2 = new AttackType();

  kick1.attackMessage =`${player} lands a low roundhouse kick to the ribs of ${opponent}, 25% damage is dealt to ${opponent}!!`;
  kick1.attackType = AttackTypeEnum.KICK;
  attackTypes.push(kick1);

  kick2.attackMessage =`${player} hits ${opponent} with a front snap kick and deals 25% to ${opponent}!!`;
  kick2.attackType = AttackTypeEnum.KICK;
  attackTypes.push(kick2);

  //punch
  let punch1 = new AttackType();
  let punch2 = new AttackType();

  punch1.attackMessage = `${opponent} takes an uppercut punch to the head, 25% damage is dealt to ${opponent}!!`;
  punch1.attackType = AttackTypeEnum.PUNCH;
  attackTypes.push(punch1);

  punch2.attackMessage = `25% damage is dealt to ${opponent} after ${player} lands a back Hand punch!!`;
  punch2.attackType = AttackTypeEnum.PUNCH;
  attackTypes.push(punch2);

  //power
  let power = new AttackType();

  power.attackMessage = `${player} lands a roundhouse kick and uppercut punch super combo, ${opponent} takes 25% damage!!`;
  power.attackType = AttackTypeEnum.POWER;
  attackTypes.push(power);

  return attackTypes
}


