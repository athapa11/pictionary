using System.ComponentModel.DataAnnotations;

namespace server.Dtos.Message
{
    public class CreateMessageDto
    {   
        [Required]
        [MinLength(1, ErrorMessage="Content cannot be empty")]
        public string Content { get; set; } = string.Empty;
    }
}