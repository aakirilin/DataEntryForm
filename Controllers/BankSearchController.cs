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
            var banks = System.IO.File.ReadAllText("banks.json");
            var convertor = System.Text.Json.JsonSerializer.Deserialize<BankFile>(banks);
            
            var bank = convertor.banks.FirstOrDefault(b => b.bik == reqest.BIK);
            if (bank != null)
            {
                return new BankSearchResponse()
                {
                    Name = bank.name,
                    CorrespondentAccount = bank.correspondentAccount
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
