import { observable, computed } from "mobx";

class OrderLine {
  @observable price: number = 0;
  @observable amount: number = 1;

  @computed get total(): number {
    return this.price * this.amount;
  }
}

export default OrderLine;
