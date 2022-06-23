namespace TestCreator.WebAPI.Dtos.Auth.Payloads
{
    public record LoginUserPayload(string JwtToken, string Username);
}