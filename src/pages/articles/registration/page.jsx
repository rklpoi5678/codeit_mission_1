import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  articleNameValidate,
  articleDescribeValidate,
} from "@/utils/articles/validators.js";
import { LoginModal } from "@/components/Modal/LoginModal";
import styles from "./ArticleRegistraion.module.css";
import { createArticle } from "@/api/ArticleService";

export function ArticleRegistration() {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [toggleBtn, setToggleBtn] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const isValid = title && content && images && !titleError && !contentError;

    if (!isValid) {
      setToggleBtn(true);
    } else {
      setToggleBtn(false);
    }
    // navigate('/products/items');
  }, [titleError, contentError, title, content, images, navigate]);

  const handleOnChangeName = (e) => {
    setTitle(e.target.value.trim());
    setTitleError(articleNameValidate(title));
  };

  const handleOnChangeDescribe = (e) => {
    setContent(e.target.value.trim());
    setContentError(articleDescribeValidate(content));
  };

  const handleOnChangeImages = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const imagePreview = files.map((file) => URL.createObjectURL(file));
    setImagesPreview(imagePreview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("contet", content);

    images.forEach((file) => {
      formData.append("images", file);
    });

    if (toggleBtn) {
      alert("입력 필드를 확인해주세요!");
      return;
    }

    try {
      const response = await createArticle(title, content, images);

      if (response.status === 201) {
        // 임시적인 리다이렉트
        navigate("/articles");
      }
    } catch (error) {
      // (기술부채x 미션중 개인 생각 있었으면 좋을것) toast 사용
      console.error("등록중 오류 발생:", error);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <form
        className={styles.RegContainer}
        method="POST"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className={styles.RegTitle}>
          <h2>게시물 쓰기</h2>
          <button
            className={toggleBtn ? styles.disActiveBtn : styles.activeBtn}
            type="submit"
            disabled={toggleBtn}
          >
            등록
          </button>
        </div>
        <div className={styles.RegProductName}>
          <label htmlFor="article_name">제목</label>
          <input
            type="text"
            name="article_name"
            id="article_name"
            onChange={handleOnChangeName}
            placeholder="제목을 입력해주세요"
            aria-label="제목을 입력해주세요"
            required
          />
          {titleError && <span className={styles.error}>{titleError}</span>}
        </div>

        <div className={styles.RegProductDescribe}>
          <label htmlFor="article_describe">내용</label>
          <textarea
            name="article_describe"
            id="article_describe"
            onChange={handleOnChangeDescribe}
            placeholder="내용을 입력해주세요"
            aria-label="내용을 입력해주세요"
            required
          ></textarea>
          {contentError && <span className={styles.error}>{contentError}</span>}
        </div>

        <div className={styles.RegProductPrice}>
          <label htmlFor="article_price">이미지</label>
          <input
            type="file"
            name="article_image"
            id="article_image"
            accept="image/*"
            onChange={handleOnChangeImages}
            placeholder="판매 가격을 입력해주세요"
            aria-label="판매 가격을 입력해주세요"
            multiple
            required
          />

          <div className={styles.imagePreviewContainer}>
            {imagesPreview.map((url, index) => (
              <img key={index} src={url} alt={`images ${index}`} />
            ))}
          </div>
        </div>
      </form>

      {showModal && (
        <LoginModal
          close={handleCloseModal}
          msg={
            "등록중 예기치 못한 오류가 발생했습니다.\n 잠시후 다시시도해 주십시오 \n 문의(meta-os@zohomail.com)"
          }
        />
      )}
    </>
  );
}
