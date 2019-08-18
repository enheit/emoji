import { API } from "../../constants/api";

export function fetchEmoji() {
  return fetch(`${API}/emoji`);
}