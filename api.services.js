const URL_BASE = "http://localhost:8080/api/product";

export async function getAllItemsFromAPI() {
  const response = await fetch(URL_BASE);
  const data = await response.json();
  return data;
}
export async function postItemToAPI(item) {
  const response = await fetch(URL_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
}
export async function deleteItemFromAPI(id) {
  const response = await fetch(URL_BASE + "/" + id, {
    method: "DELETE",
  });
}
export async function putItemToAPI(id, item) {
  const response = await fetch(URL_BASE + "/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
}
