import React, { useEffect } from "react";
import Header from "./index";
import { AuthContextProvider } from "@/contexts/AuthContext";
import {
  ShoppingCartContextProvider,
  useShoppingCartContext,
} from "@/contexts/ShoppingCartContext";
import { Meta } from "@storybook/react";

export default { title: "organisms/Header" } as Meta<typeof Header>;

export const NoLogin = () => <Header />;

export const Login = () => {
  const authUser = {
    id: 1,
    username: "dummy",
    displayName: "Hana Kim",
    email: "hana.kim@example.com",
    profileImageUrl: "/images/sample/1.jpg",
    description: "",
  };

  const ChildComponent = () => {
    const { addProductToCart } = useShoppingCartContext();

    useEffect(() => {
      addProductToCart({
        id: 1,
        category: "book",
        title: "Product",
        description: "",
        imageUrl: "/images/sample/1.jpg",
        blurDataUrl: "",
        price: 10000,
        condition: "used",
        owner: authUser,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Header />;
  };

  return (
    <ShoppingCartContextProvider>
      <AuthContextProvider
        context={{ apiRootUrl: "https://dummy" }}
        authUser={authUser}
      >
        <ChildComponent />
      </AuthContextProvider>
    </ShoppingCartContextProvider>
  );
};
