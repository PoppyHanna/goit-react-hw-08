import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, deleteContact } from "../../redux/contacts/operations";
import { selectFilteredContacts } from "../../redux/contacts/selectors"; // ⬅️ фільтровані контакти
import ConfirmDeleteModal from "../../components/deleteModal/ConfirmDeleteModal";
import toast from "react-hot-toast";
import AddContactForm from "../../components/contactForm/AddContactForm";
import Filter from "../../components/filter/Filter";
import css from "./ContactsPage.module.css";

export default function ContactsPage() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);

  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDeleteConfirm = () => {
    dispatch(deleteContact(contactToDelete.id))
      .unwrap()
      .then(() => {
        toast.success(`Contact "${contactToDelete.name}" deleted`);
      })
      .catch(() => {
        toast.error("Failed to delete contact");
      });
    setContactToDelete(null);
  };

  const handleCancel = () => {
    toast("Delete canceled");
    setContactToDelete(null);
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.box}>
          <h2 className={css.title}>Add contact</h2>
          <AddContactForm />
        </div>
        <div className={css.box}>
          <h2 className={css.title}>My contacts</h2>
          <Filter />
        </div>
      </div>
      <div className={css.box}>
        <ul className={css.list}>
          {contacts.map((contact) => (
            <li key={contact.id} className={css.item}>
              {contact.name}: {contact.number}
              <button
                className={css.btn}
                onClick={() => setContactToDelete(contact)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      {contactToDelete && (
        <ConfirmDeleteModal
          open={Boolean(contactToDelete)}
          onClose={handleCancel}
          onConfirm={handleDeleteConfirm}
          contactName={contactToDelete.name}
        />
      )}
    </>
  );
}
