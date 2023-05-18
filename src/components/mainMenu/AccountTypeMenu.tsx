import { MenuItemType } from "../../types/MenuItem";
import { getAccountTypeMenuItems } from "../../utils/AccountUtils";
import MenuItem from "./MenuItem";

const AccountTypeMenu = () => {
  const accountMenuItems: MenuItemType[] = getAccountTypeMenuItems();
  return (
    <div className="mt-5">
      {accountMenuItems.map((menuItem: MenuItemType) => {
        return (
          <MenuItem
            imageUrl={menuItem.imageUrl}
            title={menuItem.title}
            path={menuItem.path}
          />
        );
      })}
    </div>
  );
};

export default AccountTypeMenu;
