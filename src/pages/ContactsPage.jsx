import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, deleteContact } from "../redux/contacts/operations";
import { selectContacts } from "../redux/contacts/selectors";
import ConfirmDeleteModal from "../components/deleteModal/ConfirmDeleteModal";
import toast from "react-hot-toast";
import AddContactForm from "../components/contactForm/AddContactForm"; // додано

export default function ContactsPage() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDeleteConfirm = () => {
    dispatch(deleteContact(contactToDelete.id))
      .unwrap()
      .then(() => {
        toast.success(`Контакт "${contactToDelete.name}" видалено`);
      })
      .catch(() => {
        toast.error("Не вдалося видалити контакт");
      });
    setContactToDelete(null);
  };

  const handleCancel = () => {
    toast("Видалення скасовано");
    setContactToDelete(null);
  };

  return (
    <>
      <h2>Додати контакт</h2>
      <AddContactForm /> {/* форма для додавання контакту */}
      <h2>Мої контакти</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name}: {contact.number}
            <button onClick={() => setContactToDelete(contact)}>
              Видалити
            </button>
          </li>
        ))}
      </ul>
      {contactToDelete && (
        <ConfirmDeleteModal
          open={Boolean(contactToDelete)}
          onClose={handleCancel} // якщо натиснули "Скасувати"
          onConfirm={handleDeleteConfirm} // якщо натиснули "Так"
          contactName={contactToDelete.name}
        />
      )}
    </>
  );
}
