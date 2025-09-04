import { BASE_URL } from "../constants/api.js";

/**
 * @param {String} title
 * @param {String} content
 * @param {String} image
 */
export async function createArticle(title, content, image) {
  try {
    const res = await fetch(`${BASE_URL}/articles`, {
      method: "POST",
      body: JSON.stringify({
        title: title,
        content: content,
        image: image,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.status);
    console.log(err.message);
    throw new Error("POST요청이 실패 했습니다.");
  } finally {
    console.log("createArticle 완료");
  }
}
/**
 * @param {string} keyword
 * @param {Number} page
 * @param {Number} pageSize
 */
export async function getArticleList(page, pageSize, keyword) {
  try {
    const res = await fetch(
      `${BASE_URL}/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    alert(err.status);
  } finally {
    console.log("getArticelList 패치");
  }
}

export async function getArticle() {
  const data = await fetch(`${BASE_URL}/articles`).then((res) => res.json());
  return data;
}

/**
 * @param {Number} articleId
 */
export async function patchArticle(articleId) {
  const data = await fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "PATCH",
    body: JSON.stringify({
      title: "변경된 제목",
      content: "변경됨",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log("It is TestCode", err));

  return data;
}

/**
 * @param {Number} articleId
 */
export async function deleteArticle(articleId) {
  const data = await fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log("It is TestCode", err));

  return data;
}
