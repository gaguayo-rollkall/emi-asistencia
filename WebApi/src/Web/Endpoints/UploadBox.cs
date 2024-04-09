
using System.Net.Http.Headers;
using System.Net.Http;
using Microsoft.AspNetCore.Authorization;
using System.Text.Json;

namespace WebApi.Web.Endpoints;

public class UploadBox : EndpointGroupBase
{
    private readonly HttpClient _httpClient;
    private readonly string _clientId;

    public UploadBox()
    {
        _httpClient = new HttpClient();
        _clientId = "19921781ce7d932";
    }

    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapPost(UploadFileAsync, "/upload")
            .MapPost(DeleteFileAsync, "/remove");
    }

    [AllowAnonymous]
    public async Task UploadFileAsync(HttpContext context)
    {
        var form = await context.Request.ReadFormAsync();
        var file = form.Files["fileUpload"];

        // Check if a file was uploaded
        if (file != null && file.Length > 0)
        {
            // You can handle the uploaded file here
            // For example, save it to the file system or database
            // Example:
            // using (var stream = file.OpenReadStream())
            // {
            //     // Save the file
            // }

            var url = await UploadImageAsync(file);

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

    public async Task<string> UploadImageAsync(IFormFile file)
    {
        using var memoryStream = new MemoryStream();
        await file.CopyToAsync(memoryStream);
        var byteContent = new ByteArrayContent(memoryStream.ToArray());
        byteContent.Headers.ContentType = MediaTypeHeaderValue.Parse(file.ContentType);

        using var formData = new MultipartFormDataContent();
        formData.Add(byteContent, "image", file.FileName);

        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Client-ID", _clientId);
        var response = await _httpClient.PostAsync("https://api.imgur.com/3/image", formData);

        response.EnsureSuccessStatusCode();

        var responseStream = await response.Content.ReadAsStringAsync();
        var imgurResponse = JsonSerializer.Deserialize<ImgurUploadResponse>(responseStream, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        return imgurResponse?.Data?.Link ?? string.Empty;
    }
}
