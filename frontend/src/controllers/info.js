import search from "../assets/images/search.png";
import { User } from "../models/user";

export class Info {
  static user = new User({});
  static hostUrl = "http://localhost:5000";
  static latsPage = "";

  static async isUserLogin(navigate, isHomePage = false) {
    this.user = await LocalStorage.getItem({ key: "user" });

    // if (this.user.token && isHomePage) {
    //   navigate(`/homepage/${Info.user.userId}`);
    // }
  }

  static formatDate(date) {
    date = new Date(date);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return (
      strTime +
      "  " +
      date.getDay() +
      "/" +
      "  " +
      ` ${date.getMonth() + 1}` +
      "/" +
      date.getFullYear()
    );
  }
}

export class LocalStorage {
  static async getItem({ key }) {
    return JSON.parse(window.localStorage.getItem(`${key}`));
  }
  static async setItem({ key, value }) {
    return window.localStorage.setItem(`${key}`, JSON.stringify(value));
  }

  static async removeItem({ key }) {
    return window.localStorage.removeItem(`${key}`);
  }
}

export class Img {
  static imagesUrl = {
    facebook: "https://cdn-icons-png.flaticon.com/128/5968/5968764.png",
    searchIcon: search,
    messenger: "https://cdn-icons-png.flaticon.com/128/733/733604.png",
    bell: "https://cdn-icons-png.flaticon.com/128/1827/1827349.png",
    home: "https://cdn-icons-png.flaticon.com/128/1946/1946436.png",
    menu: "https://cdn-icons-png.flaticon.com/128/56/56763.png",
    menu2:
      "https://cdn3.iconfinder.com/data/icons/user-interface-1-10/24/icon-ui-1-options-512.png",
    defaultUserImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png",
    live: "https://image.similarpng.com/very-thumbnail/2020/05/YouTube-logo-icon-form-poi-PNG.png",
    album: "https://cdn-icons-png.flaticon.com/512/3342/3342207.png",
    emoji: "https://cdn-icons-png.flaticon.com/128/725/725107.png",
  };
}


