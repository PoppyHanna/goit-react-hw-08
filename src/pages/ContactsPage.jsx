import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, deleteContact } from "../redux/contacts/operations";
import { selectFilteredContacts } from "../redux/contacts/selectors"; // ⬅️ фільтровані контакти
import ConfirmDeleteModal from "../components/deleteModal/ConfirmDeleteModal";
import toast from "react-hot-toast";
import AddContactForm from "../components/contactForm/AddContactForm";
import Filter from "../components/filter/Filter";

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
      <h2>Add contact</h2>
      <AddContactForm />
      <h2>My contacts</h2>
      <Filter />
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name}: {contact.number}
            <button onClick={() => setContactToDelete(contact)}>Remove</button>
          </li>
        ))}
      </ul>
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
