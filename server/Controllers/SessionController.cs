using Microsoft.AspNetCore.Mvc;
using server.DTOs;
using server.Interfaces;

namespace server
{
	[ApiController]
	[Route("api/session")]
	public class SessionController : ControllerBase
	{
		private readonly ISessionManager _sessionManager;

		public SessionController(ISessionManager sessionManager){
			_sessionManager = sessionManager;
		}


		[HttpPost("create-session")]
		public IActionResult CreateSession([FromBody] CreateRequest request)
		{
			var session = _sessionManager.CreateSession(request.PlayerName);
			return Ok(session);
		}


		[HttpPost("join-session/{sessionId}")]
		public IActionResult JoinSession(string sessionId, [FromBody] JoinRequest request)
		{
			if(_sessionManager.AddPlayerToSession(sessionId, request.PlayerName, out var player, out var session))
			{
				return Ok(session);
			}
			else{
				return NotFound("Session not found");
			}
		}


		[HttpGet("{sessionId}")]
		public IActionResult GetSession(string sessionId)
		{
			return _sessionManager.GetSession(sessionId, out var session)
				? Ok(session)
				: NotFound("Session not found");
		}


		[HttpDelete("{sessionId}")]
		public IActionResult DeleteSession(string sessionId)
		{
			return _sessionManager.DeleteSession(sessionId)
				? Ok("Session deleted")
				: NotFound("Session not found");
		}
	}
}