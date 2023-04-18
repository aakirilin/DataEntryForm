using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataEntryForm.Common
{
    public class LimitedLiabilityCompanyBank
    {
        [Key]
        public Guid Id {get; set;}
        
        [ForeignKey("Bank")]
        public Guid BankId {get; set;}

        [ForeignKey("LimitedLiabilityCompany")]
        public Guid LimitedLiabilityCompanyId {get; set;}

        public BankEntity Bank {get; set;}
        public LimitedLiabilityCompanyEntity LimitedLiabilityCompany {get; set;} 
    }
}
