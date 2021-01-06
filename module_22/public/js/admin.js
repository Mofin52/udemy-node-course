const deleteProduct = (btn) => {
  const id = btn.parentNode.querySelector("[name=productId]").value;
  const csrf = btn.parentNode.querySelector("[name=_csrf]").value;
  const prodElement = btn.closest("article");
  fetch("/admin/product/" + id, {
    method: "DELETE",
    headers: {
      "csrf-token": csrf,
    },
  })
    .then((result) => {
      return result.json();
    })
    .then(() => {
      return prodElement.parentNode.removeChild(prodElement);
    })
    .catch((err) => console.log(err));
};
