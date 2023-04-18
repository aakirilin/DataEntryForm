using System;

namespace DataEntryForm.Common
{
    public class IndividualEntrepreneurData
    {
        public string INN { get; set; }
        public string OGRNIP { get; set; }
        public DateTime DateRegistration { get; set; }
        public bool NoСontract { get; set; }
        public Bank[] Banks { get; set; }
    }
}
