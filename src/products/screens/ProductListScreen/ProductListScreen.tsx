import { useRouter } from "next/router";

import { menuItems } from "@src/constants";
import { ProductListWidget } from "@src/products/widgets";
import { Container, SideBarMenu } from "@src/uikits";

const ProductListScreen = () => {
  const router = useRouter();

  const handleNavigationMenu = (menuItem: string) => {
    router.push(`/${menuItem.toLowerCase()}`);
  };

  return (
    <Container
      sidebar={
        <SideBarMenu
          menuItems={menuItems}
          defaultActiveMenuItem="Products"
          onSelect={handleNavigationMenu}
        />
      }
    >
      <ProductListWidget />
    </Container>
  );
};

export { ProductListScreen };
