export class Equipe {
  id: number;
  idPerso1: number;
  idPerso2: number;
  idPerso3: number;

  constructor(id: number, perso1_id: number, perso2_id: number, perso3_id: number) {
    this.id = id;
    this.idPerso1 = perso1_id;
    this.idPerso2 = perso2_id;
    this.idPerso3 = perso3_id;
  }
}
