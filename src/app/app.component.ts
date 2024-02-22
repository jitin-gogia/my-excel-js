import { Component } from "@angular/core";
import { ExcelService } from "./Services/excel.service";

@Component({
  selector: "my-app",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular 16";
  data1 = [
    {
      name: "data1", //sheet1 with name data1
      values: [
        { header: "eid", value: "" },
        { header: "test", value: [{ name: "test1" }, { name: "test2" }] },
        { header: "ename", value: "" },
        { header: "esal", value: [{ name: "val" }, { name: "val1" }] }
      ]
    }
  ];

  data2 = this.transform(this.data1)

  transform (data) {
    const noOfRowaToGenerate = 10;
    return data.map(({name, values}) => {
      const headers = values.reduce((prev, next) => 
        ({...prev, [next.header]: Array.isArray
        (next.value) ? next.value.map(({name}) => name): next.value}), {})
      return {
        workSheet: name,
        rows: Array(noOfRowaToGenerate).fill(headers)
      }
    })
  }
   workbookData = this.transform(this.data1)
  //  workbookData = [
  //    {
  //      workSheet: "data 1",
  //      rows: [
  //        { eid: "1", ename: "John", esal: ["val 1", "val2", "val 3"] },
  //        { eid: "4", ename: "Parker", esal: ["val 1", "val2", "val 3"] },
  //        { eid: "5", ename: "Iron", esal: ["val 1", "val2", "val 3"] }
  //      ]
  //    },
  //    {
  //      workSheet: "data 2",
  //      rows: [
  //        { eid: "9", ename: "Doe", esal: ["val 1", "val2", "val 3"] },
  //        { eid: "10", ename: "Peter", esal: ["val 1", "val2", "val 3"] },
  //        { eid: "11", ename: "Man", esal: ["val 1", "val2", "val 3"] }
  //      ]
  //    }
  //  ];
  constructor(private excelService: ExcelService) {}
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.workbookData, "sample");
  }  
}

export class JsonPipeComponent {
  object: Object = {foo: 'bar', baz: 'qux', nested: {xyz: 3, numbers: [1, 2, 3, 4, 5]}};
}
