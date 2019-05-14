import { computed, observable } from "mobx";

class OrderLine {
  @observable public price: number = 0;
  @observable public amount: number = 1;

  @computed get total(): number {
    return this.price * this.amount;
  }
}

export default OrderLine;
