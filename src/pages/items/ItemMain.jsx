import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import ItemPage from './ItemPage';
import '../../../style.css' // react에서는 루트 속성을 가져와야된다.

// 바닐라 js, React가 혼합 다음 미션때 마이그레이션
createRoot(document.getElementById('items-root')).render(
  <StrictMode>
    <ItemPage />
  </StrictMode>
)