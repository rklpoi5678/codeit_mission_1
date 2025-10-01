import axios from "axios";
import { BASE_URL } from "@/constants/api";

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
    const res = await axios.post(
      `${BASE_URL}/products`,
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

export async function getProduct(itemId) {
  try {
    const res = await axios.get(`${BASE_URL}products/${itemId}`);
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
export async function getProductList(
  page = 1,
  pageSize = 10,
  keyword = "",
  orderBy = "recent"
) {
  try {
    const res = await axios.get(
      `${BASE_URL}products?page=${page}&pageSize=${pageSize}&keyword=${keyword}&orderBy=${orderBy}`
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
export async function patchProduct(productId, name, description) {
  try {
    const res = await axios.patch(`${BASE_URL}products/${productId}`, {
      id: productId,
      name: name,
      description: description,
    });
    return res.data;
  } catch (err) {
    console.log(err.status);
    console.log(err.message);
    throw new Error("Patch 요청을 실패 하였습니다.");
  } finally {
    console.log("patchProduct 실행 완료");
  }
}

/**
 * @param {Number} productId
 */
export async function deleteProduct(productId) {
  try {
    const res = await axios.delete(`${BASE_URL}products/${productId}`);
    return res.data;
  } catch (err) {
    console.log(err.status);
    console.log(err.message);
    throw new Error("delete 요청을 실패 하였습니다.");
  } finally {
    console.log("deleteProduct 실행 완료");
  }
}
