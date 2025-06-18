using System.Security.Claims;

public interface IUserClaimsService
{
    Task<IEnumerable<Claim>> GetClaimsForUserAsync(string username);
}
