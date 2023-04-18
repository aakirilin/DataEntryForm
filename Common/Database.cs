using Microsoft.EntityFrameworkCore;

namespace DataEntryForm.Common
{
    public class Database : DbContext 
    {
        public Database(DbContextOptions<Database> options) : base(options)
        { 

        }

        public DbSet<File> Files {get; set;}
        public DbSet<BankEntity> Banks {get; set;}

        public DbSet<IndividualEntrepreneurEntity> IndividualEntrepreneurs {get; set;}
        public DbSet<IndividualEntrepreneurBank> IndividualEntrepreneursBanks {get; set;}

        public DbSet<LimitedLiabilityCompanyEntity> LimitedLiabilityCompanys {get; set;}
        public DbSet<LimitedLiabilityCompanyBank> LimitedLiabilityCompanysBanks {get; set;}
    }
}
