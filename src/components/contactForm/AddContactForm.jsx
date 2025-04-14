import { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { toast } from "react-hot-toast";

export default function AddContactForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && number) {
      dispatch(addContact({ name, number }))
        .unwrap()
        .then(() => {
          toast.success("Контакт додано!");
          setName("");
          setNumber("");
        })
        .catch(() => {
          toast.error("Не вдалося додати контакт");
        });
    } else {
      toast.error("Будь ласка, заповніть всі поля.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Ім'я:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Номер:
        <input
          type="tel"
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
      </label>
      <button type="submit">Додати контакт</button>
    </form>
  );
}
