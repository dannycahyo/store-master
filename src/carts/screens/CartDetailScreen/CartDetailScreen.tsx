import { useRouter } from "next/router";

import { CartDetailWidget } from "@src/carts/widgets";
import { menuItems } from "@src/constants";
import { Container, SideBarMenu } from "@src/uikits/components";

import type React from "react";

type CartDetailScreenProps = {
  cartId: string;
};

const CartDetailScreen: React.FC<CartDetailScreenProps> = ({ cartId }) => {
  const router = useRouter();

  const handleNavigationMenu = (menuItem: string) => {
    router.push(`/${menuItem.toLowerCase()}`);
  };

  return (
    <Container
      sidebar={
        <SideBarMenu
          menuItems={menuItems}
          defaultActiveMenuItem="Carts"
          onSelect={handleNavigationMenu}
        />
      }
    >
      <CartDetailWidget cartId={cartId} />
    </Container>
  );
};

export { CartDetailScreen };
