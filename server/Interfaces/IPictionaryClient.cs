using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DTOs;
using server.Models;

namespace server.Interfaces
{
	public interface IPictionaryClient
	{
		Task PlayerJoined(Player player, Session session);

		Task PlayerLeft(Session session);

		Task CorrectGuess(Player player, string guess);

		Task WrongGuess(Player player, string guess);

		Task ReceiveDrawing(Drawing drawing);
	}
}