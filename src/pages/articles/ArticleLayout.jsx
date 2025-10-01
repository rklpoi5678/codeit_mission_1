import { Outlet } from "react-router-dom";
import { useBreakPoint } from "@/hooks/useBreakpoint";
import { ItemHeader } from "@/components/UI/Nav/ItemHeader";
import { Footer } from '@/components/UI/Footer/Footer';

export function ArticleLayout() {
  const { isMobile, isTablet } = useBreakPoint();

  return (
    <>
      <ItemHeader />
      <Outlet context={{ isMobile, isTablet }} />

      {isMobile ?
        <Footer type={'mobile'} />
        :
        <Footer />}
    </>
  );
}