namespace server.Models
{
	public class Session
	{
		public Dictionary<string, Player> Players { get; set; } = new(); // PlayerId => Name
		public string CurrentWord { get; set; } = "";
		public string DrawerId { get; set; } = "";
		public bool RoundStarted { get; set; } = false;
	}
}