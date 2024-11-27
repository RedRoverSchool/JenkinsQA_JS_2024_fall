import { faker } from "@faker-js/faker";

module.exports = {
    newProject: function () {
        let Project = {
            name: faker.company.buzzNoun(),
            description: faker.lorem.sentences(),
            someFunction : this.myFunction()
        }
        return Project
    },

    myFunction: function () {
        
    }
}