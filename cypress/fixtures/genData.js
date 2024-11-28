import { faker } from "@faker-js/faker";

module.exports = {
    newProject: function () {
        let Project = {
            name: faker.company.buzzNoun(),
            description: faker.lorem.sentences(3),
            newDescription: faker.lorem.sentences(2)
        };
        return Project;
    },
};