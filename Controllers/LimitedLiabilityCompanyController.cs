using DataEntryForm.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace DataEntryForm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LimitedLiabilityCompanyController : ControllerBase
    {
        private readonly Database database;

        public LimitedLiabilityCompanyController(Database database){
            this.database = database;
        }
        [HttpPost]
        public async Task OnPost(LimitedLiabilityCompany limitedLiabilityCompany)
        {
            var limitedLiabilityCompanyEntity = new LimitedLiabilityCompanyEntity();
            limitedLiabilityCompanyEntity.Id = Guid.NewGuid();
            limitedLiabilityCompanyEntity.INNFileId = limitedLiabilityCompany.INNFileId;
            limitedLiabilityCompanyEntity.OGRNIPFileId = limitedLiabilityCompany.OGRNIPFileId;
            limitedLiabilityCompanyEntity.ExtractFromTheEGRIPFileId = limitedLiabilityCompany.ExtractFromTheEGRIPFileId;
            limitedLiabilityCompanyEntity.LeaseAgreementOfThePremisesFileId = limitedLiabilityCompany.LeaseAgreementOfThePremisesFileId;
            limitedLiabilityCompanyEntity.FullName = limitedLiabilityCompany.FullName;
            limitedLiabilityCompanyEntity.ShortName = limitedLiabilityCompany.ShortName;
            limitedLiabilityCompanyEntity.DateRegistration = limitedLiabilityCompany.DateRegistration;
            limitedLiabilityCompanyEntity.INN = limitedLiabilityCompany.INN;
            limitedLiabilityCompanyEntity.OGRN = limitedLiabilityCompany.OGRN;
            limitedLiabilityCompanyEntity.NoСontract = limitedLiabilityCompany.NoСontract;
            for(var i = 0; i < limitedLiabilityCompany.Banks.Length; i++){
                var bank = limitedLiabilityCompany.Banks[i];
                var bankEntity = await database.Banks
                    .FirstOrDefaultAsync(b => b.BIK == bank.BIK); 
                if(bankEntity == null){
                    bankEntity = new BankEntity();
                    bankEntity.BIK = bank.BIK;
                    bankEntity.Name = bank.Name;
                    bankEntity.PaymentAccount = bank.PaymentAccount;
                    bankEntity.CorrespondentAccount = bank.CorrespondentAccount;
                    await database.Banks.AddAsync(bankEntity);
                }
                var individualEntrepreneurBank = new LimitedLiabilityCompanyBank(){
                    Bank = bankEntity,
                    LimitedLiabilityCompany = limitedLiabilityCompanyEntity
                };
                await database.LimitedLiabilityCompanysBanks.AddAsync(individualEntrepreneurBank);
            }

            await database.LimitedLiabilityCompanys.AddAsync(limitedLiabilityCompanyEntity);
            await database.SaveChangesAsync();
        }
    }
}
