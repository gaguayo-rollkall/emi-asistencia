namespace WebApi.Web.Endpoints;

public class ImgurUploadResponse
{
    public int Status { get; set; }
    public bool Success { get; set; }
    public ImgurImageData? Data { get; set; }
}

public class ImgurImageData
{
    public string? Link { get; set; }
}
