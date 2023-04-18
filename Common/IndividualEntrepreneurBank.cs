using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataEntryForm.Common
{
    public class IndividualEntrepreneurBank
    {
        [Key]
        public Guid Id {get; set;}
        
        [ForeignKey("Bank")]
        public Guid BankId {get; set;}

        [ForeignKey("IndividualEntrepreneur")]
        public Guid IndividualEntrepreneurId {get; set;}

        public BankEntity Bank {get; set;}
        public IndividualEntrepreneurEntity IndividualEntrepreneur {get; set;} 
    }
}
