using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace DataEntryForm.Common
{
    public class File {

        [Key]
        public Guid Id {get; set;}
        public string Name {get; set;}
        public byte[] Content {get; set;}
    }
}
