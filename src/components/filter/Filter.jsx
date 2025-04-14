import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/filters/slice";
import { selectFilter } from "../../redux/contacts/selectors";

export default function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div>
      <label>
        Find contacts by name:
        <input type="text" value={filter} onChange={handleChange} />
      </label>
    </div>
  );
}
