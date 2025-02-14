namespace server.DTOs
{
	public class JoinRequest
	{
		public required string SessionId { get; set; }
		public required string PlayerName { get; set; }
	}
}