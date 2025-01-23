using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Message
{
    public class MessageDto
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;


        // activity
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public Boolean Edited { get; set; } = false;


        // relationship
        public string CreatedBy { get; set; } = string.Empty;
        public int? ChatId { get; set; }
    }
}