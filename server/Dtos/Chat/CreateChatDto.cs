using System.ComponentModel.DataAnnotations;

namespace server.Dtos.Chat
{
    public class CreateChatDto
    {   
        [Required]
        [MaxLength(12, ErrorMessage="Title cannot be over 20 characters")]
        public string ChatName { get; set; } = string.Empty;
    }
}