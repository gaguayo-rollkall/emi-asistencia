using Microsoft.AspNetCore.Authorization;

namespace WebApi.Web.Endpoints;

public class UploadBox : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapPost(UploadFileAsync, "/upload")
            .MapPost(DeleteFileAsync, "/remove");
    }

    [AllowAnonymous]
    public async Task UploadFileAsync(HttpContext context, IWebHostEnvironment hostingEnvironment)
    {
        var form = await context.Request.ReadFormAsync();
        var file = form.Files["fileUpload"];

        // Check if a file was uploaded
        if (file != null && file.Length > 0)
        {
            var url = await UploadImageAsync(file, hostingEnvironment);

            // Return a success response
            context.Response.StatusCode = StatusCodes.Status200OK;
            context.Response.Headers.Append("url", url.ToString());
            await context.Response.WriteAsync(url);
        }
        else
        {
            // No file was uploaded
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsync("No file uploaded.");
        }
    }

    [AllowAnonymous]
    public Task DeleteFileAsync(HttpContext context)
    {
        return Task.CompletedTask;
    }

    public async Task<string> UploadImageAsync(IFormFile file, IWebHostEnvironment hostingEnvironment)
    {
        // Generate a random file name
        string uniqueFileName = Guid.NewGuid().ToString();

        // Get the file extension
        string fileExtension = Path.GetExtension(file.FileName);

        // Combine the random file name and the file extension
        string newFileName = uniqueFileName + fileExtension;

        // Get the folder path where you want to save the file
        string uploadsFolder = Path.Combine(hostingEnvironment.WebRootPath, "images");

        // Ensure the directory exists, if not, create it
        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder);
        }

        // Combine the folder path and the file name
        string filePath = Path.Combine(uploadsFolder, newFileName);

        // Save the file
        using (var fileStream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(fileStream);
        }

        return $"images/{newFileName}";
    }
}
