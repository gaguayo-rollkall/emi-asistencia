using System.Net.Mail;
using WebApi.Application.Common.Interfaces;

namespace WebApi.Application.Estudiantes.Commands;

public class EnviarInvitacionCommand : IRequest<bool>
{
    public string? Codigo { get; set; }
    public int? EventoId { get; set; }
    public IList<string>? Emails { get; set; }
}

public class EnviarInvitacionCommandHandler : IRequestHandler<EnviarInvitacionCommand, bool>
{
    private readonly IApplicationDbContext _context;

    public EnviarInvitacionCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(EnviarInvitacionCommand request, CancellationToken cancellationToken)
    {
        if (!string.IsNullOrEmpty(request.Codigo))
        {
            await EnviarInvitacionEstudiante(request, cancellationToken);
            return true;
        }

        await EnviarInvitacionEvento(request, cancellationToken);

        return true;
    }

    private async Task EnviarInvitacionEvento(EnviarInvitacionCommand request, CancellationToken cancellationToken)
    {
        var evento = await _context.EventosCalendario
            .AsNoTracking()
            .Where(e => e.Id == request.EventoId)
            .SingleAsync(cancellationToken);

        var usuarios = await _context.UsuarioInformaciones
            .Where(u => request.Emails!.Contains(u.UserId!))
            .ToListAsync(cancellationToken);

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
            // MailAddress from = new MailAddress("emibolivia.noreply@gmail.com", "EMI");
            // MailAddress to = new MailAddress(estudiante.Email, estudiante.Nombre);
            MailMessage myMail = new MailMessage("EMI <emibolivia.noreply@gmail.com>", string.Join(";", request.Emails!));

            // add ReplyTo
            MailAddress replyTo = new MailAddress("emibolivia.noreply@gmail.com");
            myMail.ReplyToList.Add(replyTo);

            // set subject and encoding
            myMail.Subject = $"Evento #{evento.Id} - {evento.Subject}";
            myMail.SubjectEncoding = System.Text.Encoding.UTF8;

            var qrCodeImage = await GenerateQRCode(evento.Id.ToString());
            var base64Image = ConvertImageToBase64(qrCodeImage);

            var bytes = Convert.FromBase64String(base64Image);
            var ms = new MemoryStream(bytes);

            var fileName = $"{evento.Subject}.png";
            var data = new Attachment(ms, fileName);
            data.ContentId = fileName;
            data.ContentDisposition!.Inline = true;
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
                                                  <h1 class=""card-title"" id=""iva5r"" style=""box-sizing: border-box; font-size: 25px; font-weight: 300; color: rgb(68, 68, 68);"">Evento #{evento.Id} - {evento.Subject}
                                                  </h1>
                                                  <p class=""card-text"" style=""box-sizing: border-box;"">{evento.Subject}.</p>
                                                    <p class=""card-text"" style=""box-sizing: border-box;"">{evento.StartTime!.Value!.ToString("dd/MM/yyyy - HH:mm")} / {evento.EndTime!.Value.ToString("HH:mm")}.</p>
                                                  <table class=""c1542"" style=""box-sizing: border-box; margin-top: 0px; margin-right: auto; margin-bottom: 10px; margin-left: auto; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px; width: 100%;"" width=""100%"">
                                                    <tbody style=""box-sizing: border-box;"">
                                                        <img id=""qrImage"" src=""cid:{fileName}"" alt=""QR"">
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

    private async Task EnviarInvitacionEstudiante(EnviarInvitacionCommand request, CancellationToken cancellationToken)
    {
        var estudiante = await _context.Estudiantes
            .AsNoTracking()
            .Where(e => e.Codigo == request.Codigo)
            .SingleOrDefaultAsync(cancellationToken);

        if (estudiante is null || string.IsNullOrEmpty(estudiante.Email))
        {
            return;
        }

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
            MailAddress to = new MailAddress(estudiante.Email, estudiante.Nombre);
            MailMessage myMail = new System.Net.Mail.MailMessage(from, to);

            // add ReplyTo
            MailAddress replyTo = new MailAddress("emibolivia.noreply@gmail.com");
            myMail.ReplyToList.Add(replyTo);

            // set subject and encoding
            myMail.Subject = "Invitacion Sistema de Asistencia";
            myMail.SubjectEncoding = System.Text.Encoding.UTF8;

            var qrCodeImage = await GenerateQRCode(estudiante.Codigo);
            var base64Image = ConvertImageToBase64(qrCodeImage);

            var bytes = Convert.FromBase64String(base64Image);
            var ms = new MemoryStream(bytes);

            var fileName = $"{estudiante.Codigo} {estudiante.Nombre}.png";
            var data = new Attachment(ms, fileName);
            data.ContentId = fileName;
            data.ContentDisposition!.Inline = true;
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
                                                  <h1 class=""card-title"" id=""iva5r"" style=""box-sizing: border-box; font-size: 25px; font-weight: 300; color: rgb(68, 68, 68);"">Bienvenido al sistema de asistencia
                                                  </h1>
                                                  <p class=""card-text"" id=""invyv"" style=""box-sizing: border-box;"">Puede ingresar a traves de la aplicacion movil y registrar su asistencia a los eventos de la Escuela Militar de Ingenieria.
                                                  </p>
                                                  <table class=""c1542"" style=""box-sizing: border-box; margin-top: 0px; margin-right: auto; margin-bottom: 10px; margin-left: auto; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px; width: 100%;"" width=""100%"">
                                                    <tbody style=""box-sizing: border-box;"">
                                                        <img id=""qrImage"" src=""cid:{fileName}"" alt=""QR"">
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

    static async Task<byte[]> GenerateQRCode(string data)
    {
        var qrURl = $"https://api.qrserver.com/v1/create-qr-code/?size=300x300&data={data}";
        using var httpClient = new HttpClient();
        var imageData = await httpClient.GetByteArrayAsync(qrURl);

        return imageData;
    }

    static string ConvertImageToBase64(byte[] image)
    {
        string base64String = Convert.ToBase64String(image);
        return base64String;
    }
}
