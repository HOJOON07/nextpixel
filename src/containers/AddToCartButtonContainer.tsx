import Button from "@/components/atoms/Button";
import { useShoppingCartContext } from "@/contexts/ShoppingCartContext";
import { Product } from "@/types/data";

interface AddToCartButtonContainerPros {
  /**
   * 추가될 상품
   */
  product: Product;

  /**
   * 추가 버튼을 클릭했을 때 이벤트 핸들러
   */
  onAddToCartButtonClick?: (product: Product) => void;
}

/**
 * 카트 추가 버튼 컨테이너
 */

const AddToCartButtonContainer = ({
  product,
  onAddToCartButtonClick,
}: AddToCartButtonContainerPros) => {
  const { cart, addProductToCart } = useShoppingCartContext();
  const handleAddToCartButtonClick = () => {
    const productId = Number(product.id);
    const result = cart.findIndex((value) => value.id === productId);
    // 장바구니에 추가 버튼을 눌렀을때 이미 카트에 담겨져 있다면? 카트에 추가하게 된다.
    if (result === -1) {
      addProductToCart(product);
    }

    onAddToCartButtonClick && onAddToCartButtonClick(product);
  };

  return (
    <Button
      width={{ base: "100%", md: "400px" }}
      height="66px"
      onClick={handleAddToCartButtonClick}
    >
      카트에 추가
    </Button>
  );
};

export default AddToCartButtonContainer;
