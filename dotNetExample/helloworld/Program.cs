using Google.Apis.Auth.OAuth2;
using System.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();


app.MapGet("/", async context =>
{
    Console.WriteLine("Program starting");
    //Creating identity token from service account key json file of step 2
    //The key json file is located in the same folder that the Startup.cs
    GoogleCredential credential = GoogleCredential.FromFile("C:\\Users\\HP\\Downloads\\visioniert-423714-f6ae290acaed.json");
    var audience = "https://europe-west3-visioniert-423714.cloudfunctions.net/watermark-image-function";
    var token = await credential.GetOidcTokenAsync(OidcTokenOptions.FromTargetAudience(audience), CancellationToken.None);
    String bt = await token.GetAccessTokenAsync(CancellationToken.None);

    //Create http client to send web request
    //HttpClient hc = new HttpClient
    //hc.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", bt);
    //HttpResponseMessage hr = await hc.GetAsync("[CLOUD_FUNCTION_URL]");
    //string responseBody = await hr.Content.ReadAsStringAsync();
    //Console.WriteLine(responseBody);
    await context.Response.WriteAsync(bt);

});

app.Run();
