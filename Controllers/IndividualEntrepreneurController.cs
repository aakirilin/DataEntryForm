using DataEntryForm.Common;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Text.Unicode;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using System.Text.Json;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace DataEntryForm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IndividualEntrepreneurController : ControllerBase
    {
        private readonly Database database;

        public IndividualEntrepreneurController(Database database)
        {
            this.database = database;
        }
        
        [HttpPost]
        public async Task OnPost(IndividualEntrepreneur individualEntrepreneur)
        {
            var individualEntrepreneurEntity = new IndividualEntrepreneurEntity();
            individualEntrepreneurEntity.Id = Guid.NewGuid();
            individualEntrepreneurEntity.INNFileId = individualEntrepreneur.INNFileId;
            individualEntrepreneurEntity.OGRNIPFileId = individualEntrepreneur.OGRNIPFileId;
            individualEntrepreneurEntity.ExtractFromTheEGRIPFileId = individualEntrepreneur.ExtractFromTheEGRIPFileId;
            individualEntrepreneurEntity.LeaseAgreementOfThePremisesFileId = individualEntrepreneur.LeaseAgreementOfThePremisesFileId;
            individualEntrepreneurEntity.INN = individualEntrepreneur.INN;
            individualEntrepreneurEntity.OGRNIP = individualEntrepreneur.OGRNIP;
            individualEntrepreneurEntity.DateRegistration = individualEntrepreneur.DateRegistration;
            individualEntrepreneurEntity.NoСontract = individualEntrepreneur.NoСontract;
            for(var i = 0; i < individualEntrepreneur.Banks.Length; i++){
                var bank = individualEntrepreneur.Banks[i];
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
                var individualEntrepreneurBank = new IndividualEntrepreneurBank(){
                    Bank = bankEntity,
                    IndividualEntrepreneur = individualEntrepreneurEntity
                };
                await database.IndividualEntrepreneursBanks.AddAsync(individualEntrepreneurBank);
            }

            await database.IndividualEntrepreneurs.AddAsync(individualEntrepreneurEntity);
            await database.SaveChangesAsync();
        }
    }
}
