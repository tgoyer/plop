using System.Security.Claims;

public class ClaimsTransformationMiddleware
{
    private readonly RequestDelegate _next;

    public ClaimsTransformationMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context, IUserClaimsService claimsService)
    {
        if (context.User.Identity?.IsAuthenticated == true)
        {
            var username = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!string.IsNullOrEmpty(username))
            {
                var additionalClaims = await claimsService.GetClaimsForUserAsync(username);
                var id = new ClaimsIdentity(additionalClaims);
                context.User.AddIdentity(id);
            }
        }
        await _next(context);
    }
}
