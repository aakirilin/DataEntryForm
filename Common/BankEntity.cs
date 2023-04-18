using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataEntryForm.Common
{
    public class BankEntity 
    {

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id {get; set;}
        public string BIK { get; set; }
        public string Name { get; set; }
        public string PaymentAccount { get; set; }
        public string CorrespondentAccount { get; set; }
    }
}
