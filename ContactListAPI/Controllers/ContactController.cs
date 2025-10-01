using ContactListAPI.Models;
using ContactListAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace ContactListAPI.Controllers {

    [ApiController]
    [Route("api/[controller]")] //Root

    public class ContactsController : ControllerBase
    {

        private readonly ContactService _contactService;

        public ContactsController(ContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpGet]
        public List<Contact> GetAllContacts()
        {
            return _contactService.GetAllContacts();
        }

        [HttpGet]
        [Route("{id}")]
        public Contact GetContact([FromRoute] int id)
        {
            return _contactService.GetContact(id);
        }

        //HTTP POST
        [HttpPost]
        public Contact CreateContact([FromBody] Contact contact)
        {
            return _contactService.CreateContact(contact);
        }

        //HTTP PUT
        [HttpPut]
        [Route("{id}")]
        public Contact UpdateContact([FromRoute] int id, [FromBody] Contact contact) 
        {
            return _contactService.UpdateContact(id, contact);
        }
    }
}