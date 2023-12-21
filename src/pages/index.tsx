import Text from "@/components/atoms/Text";
import Box from "@/components/layout/Box";
import Flex from "@/components/layout/Flex";
import ProductCard from "@/components/organisms/ProductCard";
import ProductCardCarousel from "@/components/organisms/ProductCardCarousel";
import Layout from "@/components/templates/Layout";
import getAllProducts from "@/services/products/get-all-products";
import { ApiContext, Product } from "@/types/data";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";

type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>;

const HomePage: NextPage<HomePageProps> = ({
  bookProducts,
  clothesProducts,
  shoesProducts,
}: HomePageProps) => {
  // 캐러셀 렌더링 컴포넌트
  const renderProductCardCarousel = (products: Product[]) => {
    return (
      <ProductCardCarousel>
        {products.map((product: Product, index: number) => (
          <Box paddingLeft={index === 0 ? 0 : 2} key={product.id}>
            <Link href={`/products/${product.id}`} passHref>
              <a>
                <ProductCard
                  variant="small"
                  title={product.title}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  blurDataUrl={product.blurDataUrl}
                ></ProductCard>
              </a>
            </Link>
          </Box>
        ))}
      </ProductCardCarousel>
    );
  };
  //

  return (
    <Layout>
      <Flex padding={2} justifyContent="center" backgroundColor="primary">
        <Flex
          width={{ base: "100%", md: "1040px" }}
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ base: "column", md: "row" }}
        >
          <Box width="100%">
            <Text as="h1" marginBottom={0} color="white" variant="extraLarge">
              nextpixel에서
            </Text>
            <Text as="h1" marginTop={0} color="white" variant="extraLarge">
              마음에 드는 아이템을 찾자
            </Text>
          </Box>
          <Box width="100%">
            <Text as="p" color="white" variant="mediumLarge">
              nextpixel은 현업에서 적용 가능한 E-Commerce 웹 애플리케이션
              입니다. 목 서버를 사용하고 있으며 소스 코드는
              <Text
                as="a"
                style={{ textDecoration: "underline" }}
                target="blank"
                href="https://github.com/HOJOON07/nextpixel"
                variant="mediumLarge"
                color="white"
              >
                이쪽
              </Text>
              의 Github에서 다운로드 할 수 있습니다.
            </Text>
            <Text as="p" color="white" variant="mediumLarge">
              이 애플리케이션은 타입스크립트 / NEXT.js로 만들었으며, 백엔드의 목
              API는 json-server를 사용했습니다.
            </Text>
          </Box>
        </Flex>
      </Flex>
      <Flex paddingBottom={2} justifyContent="center">
        <Box
          paddingLeft={{ base: 2, md: 0 }}
          paddingRight={{ base: 2, md: 0 }}
          width={{ base: "100%", md: "1040px" }}
        >
          <Box marginBottom={3}>
            <Text as="h2" variant="large">
              의류
            </Text>
            {renderProductCardCarousel(clothesProducts)}
          </Box>
          <Box marginBottom={3}>
            <Text as="h2" variant="large">
              책
            </Text>
            {renderProductCardCarousel(bookProducts)}
          </Box>
          <Box marginBottom={3}>
            <Text as="h2" variant="large">
              신발
            </Text>
            {renderProductCardCarousel(shoesProducts)}
          </Box>
        </Box>
      </Flex>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || "http;//localhost:5000",
  };

  const [clothesProducts, bookProducts, shoesProducts] = await Promise.all([
    getAllProducts(context, { category: "clothes", limit: 6, page: 1 }),
    getAllProducts(context, { category: "book", limit: 6, page: 1 }),
    getAllProducts(context, { category: "shoes", limit: 6, page: 1 }),
  ]);
  return {
    props: {
      clothesProducts,
      bookProducts,
      shoesProducts,
    },
    revalidate: 60,
  };
};

export default HomePage;
