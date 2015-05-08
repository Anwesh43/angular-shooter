class Employee  {
	construct(name,age,id) {
		this.name = name;
		this.age = age;
		this.id = id;
	}
	displayEmployee() {
		console.log("My name  is "+this.name+" and age is "+this.age+" ");
	}
}
let emp = Employee("Anwesh",22,1);
emp.displayEmployee();


