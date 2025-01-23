using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Data;
using Microsoft.AspNetCore.Identity;

namespace server.Models
{
    public class User : IdentityUser
    {
        public List<UserChat> UserChats { get; set; } = new List<UserChat>();
    }
}