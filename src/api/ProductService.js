import axios from "axios";

const app = axios.create({
  baseURL: "https://panda-market-api-crud.vercel.app",
});

/**
 *
 * @param {String} name
 * @param {String} description
 * @param {Number} price
 * @param {String[]} tags > Tag
 * @param {String[]} images > UrlType pattern: ^https://...
 */
export async function createProduct(name, description, price, tags, images) {
  try {
    const res = await app.post(
      `/products`,
      {
        name,
        description,
        price,
        tags,
        images,
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
    console.log("createProduct 실행 완료");
  }
}

export async function getProduct() {
  try {
    const res = await app.get("products");
    return res.data;
  } catch (err) {
    console.log(err.status);
    console.log(err.message);
    throw new Error("상품 리스트를 가져오지 못했습니다.");
  } finally {
    console.log("getProduct 실행 완료");
  }
}

/**
 * @param {Number} page
 * @param {Number} pageSize
 * @param {Number} keyword
 */
export async function getProductList(page, pageSize, keyword) {
  try {
    const res = await app.get(
      `/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
    );
    return res.data;
  } catch (err) {
    console.log(err.status);
    console.log(err.message);
    throw new Error("상품 리스트를 가져오지 못했습니다.");
  } finally {
    console.log("getProductList 실행 완료");
  }
}

/**
 * @param {Number} productId
 */
export async function patchProduct(productId) {
  try {
    const res = await app.patch(`products/${productId}`, {
      name: "change",
      description: "change",
    });
    return res.data;
  } catch (err) {
    console.log(err.status);
    console.log(err.message);
    throw new Error("Post 요청을 실패 하였습니다.");
  } finally {
    console.log("patchProduct 실행 완료");
  }
}

/**
 * @param {Number} productId
 */
export async function deleteProduct(productId) {
  try {
    const res = await app.delete(`products/${productId}`);
    return res.data;
  } catch (err) {
    console.log(err.status);
    console.log(err.message);
    throw new Error("Post 요청을 실패 하였습니다.");
  } finally {
    console.log("patchProduct 실행 완료");
  }
}
