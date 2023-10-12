const data = {
  employees: require('../data/employees.json'),
  setEmployees: function (data) {this.employees = data}
}

const getAllEmployees = (req, res) => {
  res.json(data.employees)
}

const createNewEmployee = (req, res) => {
  
  const newEmployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  }

  if(!newEmployee.firstName || !newEmployee.lastName){
    return res.status(400).json({'message': 'First and last names are required!'})
  }

  data.setEmployees([...data.employees, newEmployee])

  res.status(201).json(data.employees) // 201 means created new record

}

const updateEmployee = ({body: {id, firstName, lastName}}, res) => {

  const employee = data.employees.find(emp => emp.id === parseInt(req.body.id))
  
  if (!employee) return res.status(400).json({message: `Employee ID: ${req.body.id} not found!`})
  
  if(firstName) employee.firstName = firstName
  if(lastName) employee.lastName = lastName
  
  const filteredArray = data.employees.filter(emp => emp.id !== parseInt(id))
  const unsortedArray = [...filteredArray, employee]
  data.setEmployees(unsortedArray.sort((a,b) =>a.id > b.id?1:a.id<b.id?-1:0))
  res.json(data.employees)
  
}

const deleteEmployee = (req, res) => {
  const employee = data.employees.find(emp => emp.id === parseInt(req.body.id))
  if (!employee) return res.status(400).json({message: `Employee ID: ${req.body.id} not found!`})
  const filteredArray = data.employees.filter(emp => emp.id !== parseInt(id))
  data.setEmployees([...filteredArray])
  res.json(data.employees)
}

const getEmployee = (req, res) => {
  const employee = data.employees.find(emp => emp.id === parseInt(req.body.id))
  if (!employee) return res.status(400).json({message: `Employee ID: ${req.body.id} not found!`})
  res.json(employee)
}

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
}