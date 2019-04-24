import { observable, action, runInAction } from "mobx";
import axios from "../../net";

class Store {
  @observable data = [];
  @observable state: string = "pending"; // "pending" / "done" / "error"
  @action
  fetchData() {
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
