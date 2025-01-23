using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Chat
{
    public class EditChatDto
    {   
        [Required]
        [MaxLength(12, ErrorMessage="Title cannot be over 20 characters")]
        public string ChatName { get; set; } = string.Empty;
    }
}