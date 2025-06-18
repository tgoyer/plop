using System.Security.Claims;

public class UserClaimsService : IUserClaimsService
{
    private readonly YourDbContext _db;

    public UserClaimsService(YourDbContext db)
    {
        _db = db;
    }

    public async Task<IEnumerable<Claim>> GetClaimsForUserAsync(string username)
    {
        var user = await _db.Users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Username == username);
        if (user == null) return Enumerable.Empty<Claim>();
        return user.Roles.Select(r => new Claim(ClaimTypes.Role, r.Name));
    }
}
