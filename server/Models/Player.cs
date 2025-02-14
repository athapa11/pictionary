namespace server.Models
{
	public class Player
	{
		public required string Id { get; set; }
    public string Name { get; set; } = string.Empty;
		public int Score { get; set; } = 0;
	}
}