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
    public class ProduktetController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ProduktetController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]

        public JsonResult Get()
        {
            string query = @" select produktetId,Emri,Kodi,Sasia,Qmimi,DataSkadimit,Menaxhimi from dbo.Produktet";

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

        public JsonResult Post(Produktet pro)
        {
            string query = @" 
                            insert into dbo.Produktet values
                            ('" + pro.Emri + @"',
                            '" + pro.Kodi + @"',
                            '" + pro.Sasia + @"',
                            '" + pro.Qmimi + @"',
                            '" + pro.DataSkadimit + @"',
                            '" + pro.Menaxhimi + @"'

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

        public JsonResult Put(Produktet pro)
        {
            string query = @" 
                            update dbo.Produktet set 
                    Emri = '" + pro.Emri + @"'
                    ,Kodi = '" + pro.Kodi + @"'
                    ,Sasia = '" + pro.Sasia + @"'
                    ,Qmimi = '" + pro.Qmimi + @"'
                    ,DataSkadimit = '" + pro.DataSkadimit + @"'
                    ,Menaxhimi = '" + pro.Menaxhimi + @"'


                    where produktetId = " + pro.produktetId + @" 
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
                    delete from dbo.Produktet
                    where produktetId = " + id + @" 
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