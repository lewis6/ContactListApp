namespace ContactListAPI.Exceptions
{
    public class UserNotFoundException : Exception
    {
        public UserNotFoundException(int id) : base($"User with ID {id} was not found.")
        {
            //Initializing a new instance of Exception parent class (similar to super() in Java)
        }
    }
}