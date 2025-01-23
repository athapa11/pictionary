using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.Account;
using server.Models;
using server.Service;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using NuGet.Protocol;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<User> _signinManager;

        public AccountController(UserManager<User> userManager, ITokenService tokenService, SignInManager<User> signinManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signinManager = signinManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if(!ModelState.IsValid){ return BadRequest(ModelState); }

                var user = new User
                {
                    UserName = registerDto.Username,
                    Email = registerDto.Email,
                };
                
                var createdUser = await _userManager.CreateAsync(user, registerDto.Password);

                if(createdUser.Succeeded)
                {
                    return Ok(_tokenService.CreateToken(user));
                }
                else
                {
                    return StatusCode(500, createdUser.Errors);
                }

            } catch (Exception e) // any random errors
            {   
                Console.Error.Write(e);
                return StatusCode(500, "rip bozo");
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if(!ModelState.IsValid){ return BadRequest(ModelState); }

            var user = await _userManager.Users.FirstOrDefaultAsync(n => n.UserName == loginDto.Username);

            if(user == null){

                return Unauthorized("Invalid Username");

            }

            var res = await _signinManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if(!res.Succeeded){
                return Unauthorized("Invalid Username or password");
            }

            return Ok(_tokenService.CreateToken(user));
        }
    }
}