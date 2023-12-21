import CartProduct from "@/components/organisms/CartProduct";
import { useGlobalSpinnerActionsContext } from "@/contexts/GlobalSpinnerContext";
import { useShoppingCartContext } from "@/contexts/ShoppingCartContext";
import purchase from "@/services/purchases/purchase";
import { ApiContext } from "@/types/data";

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || "/api/proxy",
};

const CartContainer = () => {
  const setGlobalSpinner = useGlobalSpinnerActionsContext();
  const { cart, removeProductFromCart } = useShoppingCartContext();

  const handleRemoveButtonClick = (id: number) => {
    removeProductFromCart(id);
  };

  const handleBuyButtonClick = async (id: number) => {
    try {
      setGlobalSpinner(true);
      await purchase(context, { productId: id });
      window.alert("상품을 구입했습니다.");
      removeProductFromCart(id);
    } catch (err) {
      if (err instanceof Error) {
        window.alert(err.message);
      }
    } finally {
      setGlobalSpinner(false);
    }
  };

  return (
    <>
      {cart.map((product) => (
        <CartProduct
          key={product.id}
          id={product.id}
          imageUrl={product.imageUrl}
          title={product.title}
          price={product.price}
          onRemoveButtonClick={handleRemoveButtonClick}
          onBuyButtonClick={handleBuyButtonClick}
        ></CartProduct>
      ))}
    </>
  );
};

export default CartContainer;
