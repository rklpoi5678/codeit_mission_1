import { useEffect, useState } from "react";
import { useBreakPoint } from "@/hooks/useBreakpoint";
import { Footer } from "@/components/UI/Footer/Footer";
import { ItemHeader } from "@/components/UI/Nav/ItemHeader";
import { Outlet } from "react-router-dom";
export function ProductLayout() {
  const { isTablet, isMobile } = useBreakPoint();
  const [itemsPerPage, setItemsPerPage] = useState(null);

  useEffect(() => {
    if (isMobile) {
      setItemsPerPage(4);
    } else if (isTablet) {
      setItemsPerPage(6);
    } else {
      setItemsPerPage(10);
    }
  }, [isMobile, isTablet]);

  return (
    <>
      <ItemHeader />
      <Outlet context={{ isMobile, isTablet, itemsPerPage }} />
      {isMobile ? (
        <Footer type={'mobile'} />
      ) : (
        <Footer />
      )}
    </>
  );
}