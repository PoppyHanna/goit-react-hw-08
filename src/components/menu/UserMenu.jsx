import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import css from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={css.menu}>
      <p className={css.name}>👤 Welcome, {user.name}</p>
      <button className={css.btn} onClick={() => dispatch(logout())}>
        Log out
      </button>
    </div>
  );
};

export default UserMenu;
