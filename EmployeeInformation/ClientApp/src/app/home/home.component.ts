import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EmployeeInformation } from "./EmployeeInformation";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  employeeTemp: EmployeeInformation = {
    employeeId: 0,
    employeeName: "",
    salary: 0,
    departmentName: "",
  };
  visibleEmployeeCreation: Boolean = false;
  visibleEmployeeEditing: Boolean = false;
  employeeInformation: Array<EmployeeInformation> = [];
  constructor(private httpCLient: HttpClient) {}
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.httpCLient
      .get("https://localhost:44365/api/EmployeeInfo")
      .subscribe((response: Array<EmployeeInformation>) => {
        this.employeeInformation = response;
      });
  }

  getEmployeeInformation() {
    this.httpCLient
      .get("https://localhost:44365/api/EmployeeInfo")
      .subscribe((response: Array<EmployeeInformation>) => {
        this.employeeInformation = response;
      });
  }

  onSubmit1(employeeInfo: EmployeeInformation) {
    this.httpCLient
      .post("https://localhost:44365/api/EmployeeInfo", employeeInfo)
      .subscribe((response: Array<EmployeeInformation>) => {
        if (response) {
          this.getEmployeeInformation();
          this.showCreateEmployeeDialog();
        }
      });
  }

  onSubmit2(employeeInfo: EmployeeInformation) {
    console.log(employeeInfo);
    this.httpCLient
      .put("https://localhost:44365/api/EmployeeInfo", employeeInfo)
      .subscribe((response: Array<EmployeeInformation>) => {
        if (response) {
          // alert("Employee added successfully!");
          this.getEmployeeInformation();
          this.toggleEditEmployeeDialog();
        }
      });
  }

  showCreateEmployeeDialog() {
    this.visibleEmployeeCreation = !this.visibleEmployeeCreation;
    document.getElementById("myModal1").style.display = this
      .visibleEmployeeCreation
      ? "block"
      : "none";
  }

  toggleEditEmployeeDialog() {
    this.visibleEmployeeEditing = !this.visibleEmployeeEditing;
    document.getElementById("myModal2").style.display = this
      .visibleEmployeeEditing
      ? "block"
      : "none";
  }

  showEditEmployeeDialog(employeeInfo: EmployeeInformation) {
    this.employeeTemp = employeeInfo;
    this.toggleEditEmployeeDialog();
  }

  deleteEmployee(employeeId: number) {
    this.httpCLient
      .delete(
        `https://localhost:44365/api/EmployeeInfo?employeeId=${employeeId}`
      )
      .subscribe((response: Array<EmployeeInformation>) => {
        if (response) {
          this.getEmployeeInformation();
        }
      });
  }
}
