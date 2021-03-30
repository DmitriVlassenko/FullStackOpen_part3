const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://DimiLight:${password}@cluster0.vpgcf.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const name = process.argv[3]
const number = process.argv[4]

const person = new Person({
    name: name,
    number: number,
})

if (process.argv.length > 5) {
    console.log('Too many arguments... node mongo.js yourpassword "Name" Number')
    process.exit(1)
}
else if (!name && !number) {
    Person.find({}).then(persons => {
        persons.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}
else if (!name || !number) {
    console.log('Name or Number is missing.')
    mongoose.connection.close()
} else {
person.save().then(result => {
    console.log(`Added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
})
}