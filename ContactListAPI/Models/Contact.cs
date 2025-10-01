namespace ContactListAPI.Models
{
    public class Contact {
        public int ContactID { get; set;} //Primary key, Entity Frmework auto-recognizes it
        public required string Name {get; set;}
        public required string Phone {get; set;}
        public string? Fax {get; set;}
        public string? Email {get; set;}
        public string? Notes {get; set;}
        public DateTime? LastUpdateDate {get; set;}
        public string? LastUpdateUserName {get; set;}
    }
}