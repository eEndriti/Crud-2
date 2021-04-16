using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using Restaurant.Models;

namespace Restaurant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvertariController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public InvertariController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]

        public JsonResult Get()
        {
            string query = @" select invertariId,Emri,Kodi,Sasia,Pershkrimi from dbo.Invertari";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("RestaurantAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpPost]

        public JsonResult Post(Invertari inv)
        {
            string query = @" 
                            insert into dbo.Invertari values
                            ('" + inv.Emri + @"',
                            '" + inv.Kodi + @"',
                            '" + inv.Sasia + @"',
                            '" + inv.Pershkrimi + @"'
                 
                             )";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("RestaurantAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }
        [HttpPut]

        public JsonResult Put(Invertari inv)
        {
            string query = @" 
                            update dbo.Invertari set 
                    Emri = '" + inv.Emri + @"'
                    ,Kodi = '" + inv.Kodi + @"'
                    ,Sasia = '" + inv.Sasia + @"'
                    ,Pershkrimi = '" + inv.Pershkrimi + @"'

                    where invertariId = " + inv.invertariId + @" 
                             ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("RestaurantAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Updated Successfully");
        }
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dbo.Invertari
                    where invertariId = " + id + @" 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("RestaurantAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Deleted Successfully");
        }
    }
}
