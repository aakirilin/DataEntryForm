using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataEntryForm.Common
{
    public class LimitedLiabilityCompanyEntity {

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id {get; set;}
        public Guid INNFileId { get; set; }
        public Guid OGRNIPFileId { get; set; }
        public Guid ExtractFromTheEGRIPFileId { get; set; }
        public Guid LeaseAgreementOfThePremisesFileId { get; set; }
        public string FullName { get; set; }
        public string ShortName { get; set; }
        public DateTime DateRegistration { get; set; }
        public string INN { get; set; }
        public string OGRN { get; set; }
        public bool NoСontract { get; set; }
    }
}
