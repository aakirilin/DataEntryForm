using DataEntryForm.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace DataEntryForm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly Database database;

        public FileController(Database database){
            this.database = database;
        }
        [HttpPost]
        public async Task<Guid> OnPost(IFormFile formFile)
        {
            var file = new Common.File();
            file.Name = formFile.FileName;
            using(var buffer = new System.IO.MemoryStream())
            {
                await formFile.CopyToAsync(buffer);
                 file.Content = buffer.ToArray();
            }
            file.Id = Guid.NewGuid();
            await database.Files.AddAsync(file);
            return file.Id;
        }
    }
}
