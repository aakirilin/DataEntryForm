using DataEntryForm.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System;
using System.Threading.Tasks;
using System.Net.Http.Json;
using System.Linq;

namespace DataEntryForm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OOOSearchController : ControllerBase
    {
        [HttpPost]
        public async Task<OOOSearchResponse> OnPost(OOOSearchReqest reqest)
        {
            HttpClient сlient = new HttpClient();
            var egrulResponse = await сlient.PostAsJsonAsync(
                "https://egrul.nalog.ru/",
                new EgrulNalogReqest() { query = reqest.INN });
            var token = await egrulResponse
                .Content
                .ReadFromJsonAsync<EgrulNalogResponse>();
            egrulResponse.Dispose();
            var nalogResponse = await сlient.GetAsync($"https://egrul.nalog.ru/search-result/{token.t}");
            var response = await nalogResponse
                .Content
                .ReadFromJsonAsync<NalogResponses>();
            nalogResponse.Dispose();
            сlient.Dispose();
            
            var data = response.rows.FirstOrDefault();
            if (data != null)
            {
                return new OOOSearchResponse()
                {
                    FullName = data.n,
                    ShortName = data.c,
                    DateRegistration = DateTime.Parse(data.r),
                    OGRN = data.o,
                };
            }
            else
            {
                return new OOOSearchResponse()
                {
                    FullName = "",
                    ShortName = "",
                    DateRegistration = null,
                    OGRN = "",
                };
            }
        }
    }
}
