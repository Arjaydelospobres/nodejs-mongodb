const Person = require("../model/Personal");

// get all data from person.json
const getAllpersons = async (req, res) => {
  const persons = await Person.find();
  if (!persons) return res.status(204).json({ message: "No persons found." });
  res.json(persons);
};

// create new data using post method
const createNewPerson = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required" });
  }

  try {
    const result = await Person.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

// using find identify the data if data id exist not over write
const updatePerson = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const persons = await Person.findOne({ _id: req.body.id }).exec();
  if (!persons) {
    return res
      .status(204)
      .json({ message: `No persons matches ID ${req.body.id}.` });
  }
  if (req.body?.firstname) persons.firstname = req.body.firstname;
  if (req.body?.lastname) persons.lastname = req.body.lastname;
  const result = await persons.save();
  res.json(result);
};
//delete the data using id
const deletePerson = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Employee ID required." });

  const persons = await Person.findOne({ _id: req.body.id }).exec();
  if (!persons) {
    return res
      .status(204)
      .json({ message: `No persons matches ID ${req.body.id}.` });
  }
  const result = await persons.deleteOne(); //{ _id: req.body.id }
  res.json(result);
};

// get specific data using id
const getPerson = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Employee ID required." });

  const person = await Person.findOne({ _id: req.params.id }).exec();
  if (!person) {
    return res
      .status(204)
      .json({ message: `No person matches ID ${req.params.id}.` });
  }
  res.json(person);
};

// export the component to call it in another component or main component
module.exports = {
  getAllpersons,
  createNewPerson,
  updatePerson,
  deletePerson,
  getPerson,
};
