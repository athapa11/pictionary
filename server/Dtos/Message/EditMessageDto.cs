using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Message
{
    public class EditMessageDto
    {
        [Required]
        [MinLength(1, ErrorMessage="Content cannot be empty")]
        public string Content { get; set; } = string.Empty;
    }
}