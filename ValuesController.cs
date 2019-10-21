using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace fyrpSol
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : Controller
    {
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "R2", "D2", "C", "3", "P0" };
        }

        // POST: api/<controller>
        [HttpPost]
        public String Post([FromBody]LoginDetailsClass details)
        {
            if (details.username == "WillQ" && details.password == "1234")
            {
                return "Login Success";
            } else
            {
                return "Login Error";
            }
        }
  }
}
