import { app } from "@/constants/api";

/**
 * @param {String} title
 * @param {String} content
 * @param {String} image
 */
export async function createArticle(title, content, image) {
  try {
    const res = await app.post(
      `/articles`,
      {
        title,
        content,
        image,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data;
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
export async function getArticleList(page, pageSize, keyword, orderBy) {
  try {
    const res = await app.get(
      `articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}&orderBy=${orderBy}`,
    );
    return res.data;
  } catch (err) {
    console.log(err.status);
    console.log(err.message);
    throw new Error("아티클 리스트를 가져오지 못했습니다.");
  } finally {
    console.log("getArticleList 패치");
  }
}

export async function getArticleById(articleId) {
  try {
    const res = await app.get(`/articles/${articleId}`);

    return res.data;
  } catch (error) {
    console.log(error.status);
    console.log(error.message);
    throw new Error("게시물을 가져오지 못했습니다.");
  } finally {
    console.log("getArticle success");
  }
}

export async function getArticle() {
  try {
    const res = await app.get(`/articles`);
    return res.data;
  } catch (err) {
    console.log(err.status);
    console.log(err.message);
    throw new Error("아티클 리스트를 가져오지 못했습니다.");
  } finally {
    console.log("getArticles 실행 완료");
  }
}

/**
 * @param {Number} articleId
 */
export async function patchArticle(articleId) {
  try {
    const res = await app.patch(
      `/articles/${articleId}`,
      {
        title: "변경된 제목",
        content: "변경됨",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return res.data;
  } catch (err) {
    console.log(err.status);
    console.log(err.message);
    throw new Error("Patch 요청을 실패 하였습니다.");
  } finally {
    console.log("patchArticle 실행 완료");
  }
}
/**
 * views increment
 */
export async function patchArticleViews(articleId) {
  try {
    const res = await app.patch(`/articles/${articleId}/views`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.log(err.status);
    console.log(err.message);
    throw new Error("Patch 요청을 실패 하였습니다.");
  } finally {
    console.log("patchArticle 실행 완료");
  }
}
/**
 * @param {Number} articleId
 */
export async function deleteArticle(articleId) {
  try {
    const res = await app.delete(`/articles/${articleId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.log(err.status);
    console.log(err.message);
    throw new Error("Delete 요청을 실패 하였습니다.");
  } finally {
    console.log("deleteArticle 실행 완료");
  }
}
