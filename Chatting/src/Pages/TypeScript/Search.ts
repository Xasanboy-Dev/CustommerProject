import axios from "axios";

export async function SearchUser(input: string) {
  if (input) {
  } else {
    localStorage.setItem("search", "nothing");
  }
}
