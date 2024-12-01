import { faker } from "@faker-js/faker";

module.exports = {
    newProject: function () {
        let Project = {
            name: faker.company.buzzNoun(),
            newName: faker.company.buzzNoun(),
            description: faker.lorem.sentences(3),
            newDescription: faker.lorem.sentences(2),
            folderName: faker.commerce.productName(),
            projectName: faker.commerce.productName()
        };
        return Project;
    },
};