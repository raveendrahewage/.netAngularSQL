using EmployeeInformation.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeInformation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeInfoController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<EmployeeInfo> ListOfEmployees()
        {
            var employeeInformation = new List<EmployeeInfo>();
            using(var context=new EmployeeDBContext())
            {
                employeeInformation = context.EmployeeInfos.ToList();
            }
            return employeeInformation;
        }
        [HttpDelete]
        public bool DeleteEmployee(int employeeId)
        {
            try
            {
                using (var context = new EmployeeDBContext())
                {
                    var employeeInformation = context.EmployeeInfos.Where(e => e.EmployeeId == employeeId).FirstOrDefault();
                    context.EmployeeInfos.Remove(employeeInformation);
                    context.SaveChanges();
                }
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return false;
            }
        }
        [HttpPost]
        public bool InsertEmployee(EmployeeInfo employeeInfo)
        {
            try
            {
                using(var context =new EmployeeDBContext())
                {
                    context.EmployeeInfos.Add(employeeInfo);
                    context.SaveChanges();
                }
                return true;
            }catch(Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return false;
            }
        }

        [HttpPut]
        public bool UpdateEmployee(EmployeeInfo employeeInfo)
        {
            try
            {
                using (var context = new EmployeeDBContext())
                {
                    var employeeInformation = context.EmployeeInfos.Where(e => e.EmployeeId == employeeInfo.EmployeeId).FirstOrDefault();
                    employeeInformation.EmployeeName = employeeInfo.EmployeeName;
                    employeeInformation.Salary = employeeInfo.Salary;
                    employeeInformation.DepartmentName = employeeInfo.DepartmentName;
                    context.Entry(employeeInformation).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return false;
            }
        }
    }
}
