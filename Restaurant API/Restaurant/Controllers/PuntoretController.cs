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
    public class PuntoretController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public PuntoretController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]

        public JsonResult Get()
        {
            string query = @" select puntoretId,EmriMbiemri,Mosha,Vendbanimi,DataPranimit,Rroga,Titulli from dbo.Puntoret";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("RestaurantAppCon");
            SqlDataReader myReader;
            using(SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using(SqlCommand myCommand = new SqlCommand(query, myCon))
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

        public JsonResult Post(Puntoret pun)
        {
            string query = @" 
                            insert into dbo.Puntoret (EmriMbiemri,Mosha,Vendbanimi,DataPranimit,Rroga,Titulli ) values
                            ('"+ pun.EmriMbiemri + @"',
                            '" + pun.Mosha + @"',
                            '" + pun.Vendbanimi + @"',
                            '" + pun.DataPranimit + @"',
                            '" + pun.Rroga + @"',
                            '" + pun.Titulli + @"'

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

        public JsonResult Put(Puntoret pun)
        {
            string query = @" 
                            update dbo.Puntoret set 
                    EmriMbiemri = '" + pun.EmriMbiemri+ @"'
                    ,Mosha = '" + pun.Mosha + @"'
                    ,Vendbanimi = '" + pun.Vendbanimi + @"'
                    ,DataPranimit = '" + pun.DataPranimit + @"'
                    ,Rroga = '" + pun.Rroga + @"'
                    ,Titulli = '" + pun.Titulli + @"'


                    where puntoretId = " + pun.puntoretId + @" 
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
                    delete from dbo.Puntoret
                    where puntoretId = " + id + @" 
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