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
            
            сlient.Dispose();
            
            var data = response.rows.FirstOrDefault();
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
