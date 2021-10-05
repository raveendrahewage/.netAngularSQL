using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace EmployeeInformation.Models
{
    public partial class EmployeeInfo
    {
        [Key]
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public decimal? Salary { get; set; }
        public string DepartmentName { get; set; }
    }
}
