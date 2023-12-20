import ProductCard from "@/components/organisms/ProductCard";
import ProductCardList from "@/components/organisms/ProductCardList";
import { ApiContext, Product } from "@/types/data";
import Link from "next/link";
import { Fragment } from "react";

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || "/api/proxy",
};

interface UserProductCardListContainerProps {
  userId: number;
  products?: Product[];
}

const UserProductCardListContainer = ({
  userId,
  products,
}: UserProductCardListContainerProps) => {
  const { products: useProducts } = useSearch(context, {
    userId,
    initial: products,
  });

  return (
    <ProductCardList>
      {useProducts.map((product) => (
        <Fragment key={product.id}>
          <Link href={`/products/${product.id}`} passHref>
            <a>
              <ProductCard
                variant="small"
                title={product.title}
                price={product.price}
                imageUrl={product.imageUrl}
              ></ProductCard>
            </a>
          </Link>
        </Fragment>
      ))}
    </ProductCardList>
  );
};
export default UserProductCardListContainer;
