using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class UserChat
    {
        public string UserId { get; set; }
        public int ChatId { get; set; }
        public User User { get; set; }
        public Chat Chat { get; set; }
    } 
}