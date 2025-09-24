import { instance } from "@/constants/api";

/**
 *
 * @param {String} name
 * @param {String} description
 * @param {Number} price
 * @param {String[]} tags > Tag
 * @param {String[]} images > UrlType pattern: ^https://...
 */
export async function createItems(name, description, price, tags) {
  try {
    const res = await instance.post(
      `api/items`,
      {
        name,
        description,
        price,
        tags,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log(err.status);
    console.log(err.message);
    throw new Error("Post 요청을 실패 하였습니다.");
  } finally {
    console.log("createItems 실행 완료");
  }
}

export async function getItems() {
  try {
    const res = await instance.get(`products`);
    return res.data;
  } catch (err) {
    console.log(err.status);
    console.log(err.message);
    throw new Error("상품 리스트를 가져오지 못했습니다.");
  } finally {
    console.log("getItems 실행 완료");
  }
}

/**
 * @param {Number} page
 * @param {Number} pageSize
 * @param {Number} keyword
 */
export async function getItemsList(
  page = 1,
  pageSize = 10,
  keyword = '',
  orderBy = "recent"
) {
  try {
    const res = await instance.get(
      `api/items?page=${page}&limit=${pageSize}&keyword=${keyword}&orderBy=${orderBy}`
    );
    return res.data;
  } catch (err) {
    console.log(err.status);
    console.log(err.message);
    throw new Error("상품 리스트를 가져오지 못했습니다.");
  } finally {
    console.log("getItemsList 실행 완료");
  }
}

/**
 * @param {Number} productId
 */
export async function patchItems(productId) {
  try {
    const res = await instance.patch(`api/items/${productId}`, {
      name: "change",
      description: "change",
    });
    return res.data;
  } catch (err) {
    console.log(err.status);
    console.log(err.message);
    throw new Error("Patch 요청을 실패 하였습니다.");
  } finally {
    console.log("patchItems 실행 완료");
  }
}

/**
 * @param {Number} productId
 */
export async function deleteItems(productId) {
  try {
    const res = await instance.delete(`api/items/${productId}`);
    return res.data;
  } catch (err) {
    console.log(err.status);
    console.log(err.message);
    throw new Error("delete 요청을 실패 하였습니다.");
  } finally {
    console.log("deleteItems 실행 완료");
  }
}
