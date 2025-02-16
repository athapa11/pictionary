using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace server.DTOs
{
	public class Drawing
	{
		public string Tool { get; set; } = string.Empty;
		public int Xaxis { get; set; }

		public int Yaxis { get; set; }

		public string Colour { get; set; } = string.Empty;

		public int Size { get; set; }
	}
}