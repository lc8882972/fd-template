import { action, observable, runInAction } from "mobx";
import axios from "../../net";

class Store {
  @observable public data = [];
  @observable public state: string = "pending"; // "pending" / "done" / "error"
  @action
  public fetchData() {
    axios.get("/mock/menu.json").then(resp => {
      const data:any= resp;
      runInAction(() => {
        this.data = data;
        this.state = "done";
      });
    });
  }


}

export default Store;
