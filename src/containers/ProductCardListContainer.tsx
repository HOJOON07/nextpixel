import RectLoader from "@/components/atoms/RectLoader";
import Box from "@/components/layout/Box";
import ProductCard from "@/components/organisms/ProductCard";
import ProductCardList from "@/components/organisms/ProductCardList";
import useSearch from "@/services/products/use-search";
import { ApiContext, Category, Condition } from "@/types/data";
import Link from "next/link";

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || "/api/proxy",
};

interface ProductCardListContainerProps {
  /**
   * 검색 쿼리 - 카테고리
   */
  category?: Category;

  /**
   * 검색 쿼리 - 상품 상태
   */

  conditions?: Condition[];
}

const ProductCardListContainer = ({
  category,
  conditions,
}: ProductCardListContainerProps) => {
  const { products, isLoading } = useSearch(context, { category, conditions });

  return (
    <ProductCardList>
      {isLoading &&
        Array.from(Array(16), (_, key) => (
          <Box key={key}>
            <Box display={{ base: "none", md: "block" }}>
              <RectLoader width={240} height={240}></RectLoader>
            </Box>
            <Box display={{ base: "block", md: "none" }}>
              <RectLoader width={160} height={160}></RectLoader>
            </Box>
          </Box>
        ))}
      {!isLoading &&
        products.map((product) => (
          <Box key={product.id}>
            <Link href={`/products/${product.id}`}>
              <a>
                <ProductCard
                  variant="listing"
                  title={product.title}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  blurDataUrl={product.blurDataUrl}
                ></ProductCard>
              </a>
            </Link>
          </Box>
        ))}
    </ProductCardList>
  );
};

export default ProductCardListContainer;
