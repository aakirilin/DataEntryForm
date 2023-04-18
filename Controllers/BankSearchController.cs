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
    public class BankSearchController : ControllerBase
    {
        [HttpPost]
        public async Task<BankSearchResponse> OnPost(BankSearchReqest reqest)
        {
            HttpClient сlient = new HttpClient();
            var issueAnInvoiceResponse = await сlient.PostAsJsonAsync(
                "https://выставить-счет.рф/classifier/bik/",
                new IssueAnInvoiceReqest() { search=reqest.BIK });
            var response = await issueAnInvoiceResponse
                .Content
                .ReadFromJsonAsync<IssueAnInvoiceResponse>();
            issueAnInvoiceResponse.Dispose();
            сlient.Dispose();
            
            var data = response.result.FirstOrDefault();
            if (data != null)
            {
                return new BankSearchResponse()
                {
                    Name = "",
                    CorrespondentAccount = ""
                };
            }
            else
            {
                return new BankSearchResponse()
                {
                    Name = "",
                    CorrespondentAccount = ""
                };
            }
        }
    }
}
