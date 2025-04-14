import { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { toast } from "react-hot-toast";
import css from "./AddContactForm.module.css";

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
          toast.success("Contact added!");
          setName("");
          setNumber("");
        })
        .catch(() => {
          toast.error("Cannot add contact!");
        });
    } else {
      toast.error("Please fill in all fields.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.box}>
      <label className={css.title}>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label className={css.title}>
        Number:
        <input
          type="tel"
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
      </label>
      <button type="submit" className={css.btn}>
        Add contact
      </button>
    </form>
  );
}
