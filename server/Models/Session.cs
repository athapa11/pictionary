using System.Collections.Concurrent;

namespace server.Models
{
	public class Session
	{
		public required string SessionId { get; set; }
    public string CurrentWord { get; set; } = string.Empty;
    public string DrawerId { get; set; } = string.Empty;
    public ConcurrentDictionary<string, Player> Players { get; set; } = new(); // PlayerId => Name
	}
}