using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.Service
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}