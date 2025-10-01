using ContactListAPI.Exceptions;
using ContactListAPI.Models;

namespace ContactListAPI.Services {

    public class ContactService
    {
        private readonly ContactDbContext _db;

        public ContactService(ContactDbContext db)
        {
            _db = db;
        }

        public List<Contact> GetAllContacts()
        {
            return [.. _db.Contacts];
        }

        public Contact GetContact(int id)
        {
            Contact? contact = _db.Contacts.Find(id);
            if (contact == null)
            {
                throw new UserNotFoundException(id);
            }
            return contact;
        }

        public Contact CreateContact(Contact contact)
        {
            DateTime utcNow = DateTime.UtcNow;
            contact.LastUpdateDate = utcNow;
            _db.Contacts.Add(contact);
            _db.SaveChanges();
            return contact;
        }

        public Contact? UpdateContact(int id, Contact contact)
        {
            Contact? existingContact = _db.Contacts.Find(id);
            if (existingContact == null)
            {
                throw new UserNotFoundException(id);
            }
            contact.ContactID = existingContact.ContactID; //Setting Id to make sure it remains unchanged
            DateTime utcNow = DateTime.UtcNow;
            contact.LastUpdateDate = utcNow;
            _db.Entry(existingContact).CurrentValues.SetValues(contact);
            _db.SaveChanges();
            return contact;
        }
    }
}