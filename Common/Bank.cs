using System;
using Microsoft.EntityFrameworkCore;

namespace DataEntryForm.Common
{
    public class Bank {
        public Guid Id {get; set;}
        public string BIK { get; set; }
        public string Name { get; set; }
        public string PaymentAccount { get; set; }
        public string CorrespondentAccount { get; set; }
    }
}
