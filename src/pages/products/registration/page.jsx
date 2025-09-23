import { useEffect, useState } from 'react';
import { productDiscribeValidate, productNameValidate, productPriceValidate, productTagValidate } from '@/utils/products/validators';
import { X } from 'lucide-react';
import styles from './RegistraionPage.module.css';
import { useNavigate } from 'react-router-dom';
import { LoginModal } from '@/components/Modal/LoginModal';
import { instance } from '@/constants/api';

export function RegistraionPage() {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [discribe, setDiscribe] = useState('');
  const [discribeError, setDiscribeError] = useState('');
  const [price, setPrice] = useState('');
  const [priceError, setPriceError] = useState('');
  const [tag, setTag] = useState('');
  const [tagError, setTagError] = useState('');
  const [toggleBtn, setToggleBtn] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const isValid = name && discribe && price && tag &&
      !nameError && !discribeError && !priceError && !tagError;

    if (!isValid) {
      setToggleBtn(true);
    } else {
      setToggleBtn(false);
    }
    // navigate('/products/items');
  }, [nameError, discribeError, priceError, tagError, name, discribe, price, tag, navigate]);

  const handleOnChageName = (e) => {
    setName(e.target.value.trim());
    setNameError(productNameValidate(name));
  };

  const handleOnChageDiscribe = (e) => {
    setDiscribe(e.target.value.trim());
    setDiscribeError(productDiscribeValidate(discribe));
  };

  const handleOnChagePrice = (e) => {
    setPrice(e.target.value.trim());
    setPriceError(productPriceValidate(price));
  };

  const handleOnChageTag = (e) => {
    setTag(e.target.value.trim());
    setTagError(productTagValidate(tag));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (toggleBtn) {
      alert("입력 필드를 확인해주세요!");
      return;
    }

    try {
      const newItems = {
        name,
        description: discribe,
        price: Number(price),
        tags: tag,
      };

      const response = await instance.post('api/items', newItems, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        // 임시적인 리다이렉트
        navigate('/products/items/detail/1');
      }
    } catch (error) {
      // (기술부채x 미션중 개인 생각 있었으면 좋을것) toast 사용
      console.error('등록중 오류 발생:', error);
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
        autoComplete='off'
      >
        <div className={styles.RegTitle}>
          <h2>상품 등록하기</h2>
          <button className={toggleBtn ? styles.disActiveBtn : styles.activeBtn} type='submit' disabled={toggleBtn}>등록</button>
        </div>
        <div className={styles.RegProductName}>
          <label htmlFor='product_name'>상품명</label>
          <input
            type="text"
            name="product_name"
            id="product_name"
            onChange={handleOnChageName}
            placeholder='상품명을 입력해주세요'
            aria-label='상품명을 입력해주세요'
            required
          />
          {nameError &&
            <span className={styles.error}>{nameError}</span>
          }
        </div>

        <div className={styles.RegProductDescribe}>
          <label htmlFor='product_describe'>상품 소개</label>
          <textarea
            name="product_describe"
            id="product_describe"
            onChange={handleOnChageDiscribe}
            placeholder='상품 소개를 입력해주세요'
            aria-label='상품 소개를 입력해주세요'
            required
          >
          </textarea>
          {discribeError &&
            <span className={styles.error}>{discribeError}</span>
          }
        </div>

        <div className={styles.RegProductPrice}>
          <label htmlFor='product_price'>판매가격</label>
          <input
            type="text"
            name='product_price'
            id='product_price'
            onChange={handleOnChagePrice}
            placeholder='판매 가격을 입력해주세요'
            aria-label='판매 가격을 입력해주세요'
            required
          />
          {priceError &&
            <span className={styles.error}>{priceError}</span>
          }
        </div>

        <div className={styles.RegProductTag}>
          <label htmlFor='product_tag'>태그</label>
          <input
            type="text"
            name='product_tag'
            id='product_tag'
            onChange={handleOnChageTag}
            placeholder='태그를 입력해주세요'
            aria-label='태그를 입력해주세요'
            required
          />
          {tagError &&
            <span className={styles.error}>{tagError}</span>
          }
          <div className={styles.RegSelectTagsContainer}>
            <div className={styles.RegSelectTags}>
              <p>#티셔츠</p>
              <X className={styles.TagIcons} width={18} height={18} color='white' />
            </div>
            <div className={styles.RegSelectTags}>
              <p>#상의</p>
              <X className={styles.TagIcons} width={18} height={18} color='white' />
            </div>
          </div>
        </div>
      </form>

      {showModal &&
        <LoginModal close={handleCloseModal} msg={'등록중 예기치 못한 오류가 발생했습니다.\n 잠시후 다시시도해 주십시오 \n 문의(meta-os@zohomail.com)'} />
      }
    </>
  );
}