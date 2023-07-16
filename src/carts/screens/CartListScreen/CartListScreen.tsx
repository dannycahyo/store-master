import { useRouter } from "next/router";

import { menuItems } from "@src/constants";
import { CartListWidget } from "@src/carts/widgets";
import { Container, SideBarMenu } from "@src/uikits";

const CartListScreen = () => {
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
      <CartListWidget />
    </Container>
  );
};

export { CartListScreen };
