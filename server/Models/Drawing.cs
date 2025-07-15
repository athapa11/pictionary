namespace server.Models
{
	public class Drawing
	{
		public float X { get; set; }
		public float Y { get; set; }
		public string Type { get; set; } = string.Empty;
		public string Colour { get; set; } = string.Empty;
		public int Size { get; set; }
	}
}