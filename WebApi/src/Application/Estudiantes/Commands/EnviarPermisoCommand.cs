using System.Net.Mail;
using System.Net.Mime;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using WebApi.Application.Common.Interfaces;
using WebApi.Domain.Entities;
using Unit = QuestPDF.Infrastructure.Unit;

namespace WebApi.Application.Estudiantes.Commands;

public class EnviarPermisoCommand : IRequest<bool>
{
    public Guid PermisoId { get; set; }
    public string? Email { get; set; }
    public string? UserId { get; set; }
}

public class EnviarPermisoCommandHandler : IRequestHandler<EnviarPermisoCommand, bool>
{
    private readonly IApplicationDbContext _context;
    public EnviarPermisoCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(EnviarPermisoCommand request, CancellationToken cancellationToken)
    {
        var licencia = await _context.Licencias
            .AsNoTracking()
            .FirstOrDefaultAsync(l => l.Id == request.PermisoId, cancellationToken);

        if (licencia is null)
        {
            return false;
        }

        var pdf = await GeneratePdfAsync(licencia, request, cancellationToken);

        if (!string.IsNullOrEmpty(pdf))
        {
            await SendEmailAsync(pdf, licencia, request, cancellationToken);
        }

        return true;
    }

    private async Task SendEmailAsync(string pdf, Licencia licencia, EnviarPermisoCommand request, CancellationToken cancellationToken)
    {
        var estudiante = await _context.Estudiantes
            .AsNoTracking()
            .FirstAsync(e => e.Codigo == licencia.CodigoEstudiante, cancellationToken);

        // send a gmail message

        try
        {

            SmtpClient mySmtpClient = new SmtpClient("smtp.gmail.com", 587);

            // set smtp-client with basicAuthentication
            mySmtpClient.UseDefaultCredentials = false;
            System.Net.NetworkCredential basicAuthenticationInfo = new
                System.Net.NetworkCredential("emibolivia.noreply@gmail.com", "eaqk srzk dorh bfdq");
            mySmtpClient.Credentials = basicAuthenticationInfo;
            mySmtpClient.EnableSsl = true;

            // add from,to mailaddresses
            MailAddress from = new MailAddress("emibolivia.noreply@gmail.com", "EMI");
            MailAddress to = new MailAddress(request.UserId!);
            MailMessage myMail = new System.Net.Mail.MailMessage(from, to);

            // add ReplyTo
            MailAddress replyTo = new MailAddress("emibolivia.noreply@gmail.com");
            myMail.ReplyToList.Add(replyTo);

            // Carbon copia
            if (!string.IsNullOrEmpty(estudiante.Email))
            {
                myMail.CC.Add(new MailAddress(estudiante.Email));
            }

            if (!string.IsNullOrEmpty(request.Email))
            {
                myMail.CC.Add(new MailAddress(request.Email));
            }

            // set subject and encoding
            myMail.Subject = $"Papeleta de Permiso - Estudiante {estudiante.Codigo}";
            myMail.SubjectEncoding = System.Text.Encoding.UTF8;

            var data = new Attachment(pdf, MediaTypeNames.Application.Pdf);
            myMail.Attachments.Add(data);

            // set body-message and encoding
            myMail.Body = $@"
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Escuela Militar de Ingenieria</title>
                </head>
                <body id=""i99j"" style=""box-sizing: border-box; margin: 0;"">
                  <table class=""main-body"" style=""box-sizing: border-box; min-height: 150px; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px; width: 100%; height: 100%; background-color: rgb(234, 236, 237);"" width=""100%"" height=""100%"" bgcolor=""rgb(234, 236, 237)"">
                    <tbody style=""box-sizing: border-box;"">
                      <tr class=""row"" style=""box-sizing: border-box; vertical-align: top;"" valign=""top"">
                        <td class=""main-body-cell"" id=""iy4f"" style=""box-sizing: border-box;"">
                          <table class=""container"" id=""ia8t"" style=""box-sizing: border-box; font-family: Helvetica, serif; min-height: 150px; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px; margin-top: auto; margin-right: auto; margin-bottom: auto; margin-left: auto; height: 0px; width: 90%; max-width: 550px;"" width=""90%"" height=""0"">
                            <tbody style=""box-sizing: border-box;"">
                              <tr style=""box-sizing: border-box;"">
                                <td class=""container-cell"" id=""iwbx"" style=""box-sizing: border-box; vertical-align: top; font-size: medium; padding-bottom: 50px;"" valign=""top"">
                                  <table class=""c1766"" style=""box-sizing: border-box; margin-top: 0px; margin-right: auto; margin-bottom: 10px; margin-left: 0px; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px; width: 100%; min-height: 30px;"" width=""100%"">
                                    <tbody style=""box-sizing: border-box;"">
                                      <tr style=""box-sizing: border-box;"">
                                        <td class=""cell c1769"" style=""box-sizing: border-box; width: 11%;"" width=""11%"">
                                          <img src=""https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgo0C-ZSsUYwNDn5n3Mmk60BSVgbUSlQqObQIjtX535SbETMlCTCQo0SvfjmoWEvkELmA&usqp=CAU"" alt=""EMI."" id=""idlim"" class=""c926"" style=""box-sizing: border-box; color: rgb(158, 83, 129); width: 100%; font-size: 50px; background-color: #000000;"">
                                        </td>
                                        <td class=""cell c1776"" style=""box-sizing: border-box; width: 70%; vertical-align: middle;"" width=""70%"" valign=""middle"">
                                          <div class=""c1144"" id=""icgxv"" style=""box-sizing: border-box; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px; font-size: 17px; font-weight: 300;"">Escuela Militar de Ingenieria
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table class=""card"" style=""box-sizing: border-box; min-height: 150px; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px; margin-bottom: 20px; height: 0px;"" height=""0"">
                                    <tbody style=""box-sizing: border-box;"">
                                      <tr style=""box-sizing: border-box;"">
                                        <td class=""card-cell"" style=""box-sizing: border-box; background-color: rgb(255, 255, 255); overflow-x: hidden; overflow-y: hidden; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; text-align: center;"" bgcolor=""rgb(255, 255, 255)"" align=""center"">
                                          <img src=""https://tropico.emi.edu.bo/images/2022/08/25/portada-1.png"" alt=""EMI"" id=""i6fby"" class=""c1271"" style=""box-sizing: border-box; width: 100%; margin-top: 0px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; font-size: 50px; color: rgb(120, 197, 214); line-height: 250px; text-align: center;"">
                                          <table class=""table100 c1357"" style=""box-sizing: border-box; width: 100%; min-height: 150px; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px; height: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; border-collapse: collapse;"" width=""100%"" height=""0"">
                                            <tbody style=""box-sizing: border-box;"">
                                              <tr style=""box-sizing: border-box;"">
                                                <td class=""card-content"" id=""iv24k"" style=""box-sizing: border-box; font-size: 13px; line-height: 20px; color: rgb(111, 119, 125); padding-top: 10px; padding-right: 20px; padding-bottom: 0px; padding-left: 20px; vertical-align: top;"" valign=""top"">
                                                  <h1 class=""card-title"" id=""iva5r"" style=""box-sizing: border-box; font-size: 25px; font-weight: 300; color: rgb(68, 68, 68);"">Permiso #{licencia.Id}
                                                  </h1>
                                                  <p class=""card-text"" id=""invyv"" style=""box-sizing: border-box;"">El permiso del estudiante se encuentra adjunto en este correo.
                                                  </p>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </body>
                </html>
            ";
            myMail.BodyEncoding = System.Text.Encoding.UTF8;
            // text or html
            myMail.IsBodyHtml = true;

            mySmtpClient.Send(myMail);
        }
        catch (SmtpException ex)
        {
            throw new ApplicationException
                ("SmtpException has occured: " + ex.Message);
        }
    }

    private async Task<string> GeneratePdfAsync(Licencia licencia, EnviarPermisoCommand request, CancellationToken cancellationToken)
    {
        var fileName = Path.Combine(Path.GetTempPath(), $"{Guid.NewGuid()}.pdf");
        var qr = await GenerateQRCode(request.PermisoId.ToString());
        
        var estudiante = await _context.Estudiantes
            .AsNoTracking()
            .FirstOrDefaultAsync(e => e.Codigo == licencia.CodigoEstudiante, cancellationToken);

        if (estudiante is null)
        {
            return string.Empty;
        }
        
        QuestPDF.Settings.License = LicenseType.Community;
        
        Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                
                page.Content()
                    .Padding(1, Unit.Centimetre)
                    .Column(x =>
                    {
                        x.Item().Row(row =>
                        {
                            row.AutoItem().Width(120).Image("emi.png");
                            row.Spacing(300);
                            row.AutoItem().Width(80).Image(qr);
                        });
                        
                        x.Spacing(20);
                        
                        x.Item()
                            .Text("Papeleta de Permiso")
                            .Underline()
                            .FontSize(20)
                            .SemiBold()
                            .AlignCenter();
                        
                        x.Spacing(10);
                        
                        x.Item().Row(row =>
                        {
                            row.AutoItem().Text("NOMBRES Y APELLIDOS: ").Bold();
                            row.Spacing(10);
                            row.AutoItem().Text($"{estudiante.Grado}. {estudiante.Nombre}");
                        });
                        
                        x.Item().Row(row =>
                        {
                            row.AutoItem().Text("CODIGO: ").Bold();
                            row.Spacing(10);
                            row.AutoItem().Text(estudiante.Codigo);
                        });
                        
                        x.Item().Row(row =>
                        {
                            row.AutoItem().Text("PERMISO: ").Bold();
                            row.Spacing(10);
                            row.AutoItem().Text(licencia.Titulo);
                        });
                        
                        x.Item().Row(row =>
                        {
                            row.AutoItem().Text("MOTIVO: ").Bold();
                            row.Spacing(10);
                            row.AutoItem().Text(licencia.Motivo);
                            row.Spacing(20);
                            row.AutoItem().Text("JUSTIFICACION: ").Bold();
                            row.Spacing(10);
                            row.AutoItem().Text(licencia.Justificacion);
                        });
                        
                        x.Item().Row(row =>
                        {
                            row.AutoItem().Text("FECHA: ").Bold();
                            row.Spacing(10);
                            row.AutoItem().Text(licencia.Fecha.ToString("yyyy-MM-dd"));
                            row.Spacing(20);
                            row.AutoItem().Text("ESTATUS: ").Bold();
                            row.Spacing(10);
                            row.AutoItem().Text(licencia.Estatus);
                        });
                    });
            });
        })
        .GeneratePdf(fileName);

        return fileName;
    }
    
    static async Task<byte[]> GenerateQRCode(string data)
    {
        var qrURl = $"https://api.qrserver.com/v1/create-qr-code/?size=300x300&data={data}";
        using var httpClient = new HttpClient();
        var imageData = await httpClient.GetByteArrayAsync(qrURl);

        return imageData;
    }
}
