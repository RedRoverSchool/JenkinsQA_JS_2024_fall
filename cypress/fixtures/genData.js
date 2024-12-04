import { faker } from "@faker-js/faker";

module.exports = {
    newProject: function () {
        let Project = {
            name: faker.company.buzzNoun(),
            longName: faker.commerce.productName(),
            newName: faker.company.buzzNoun(),
            description: faker.lorem.sentences(3),
            newDescription: faker.lorem.sentences(2),
            folderName: faker.company.buzzNoun(),
            longDescription: faker.lorem.sentences(50)
        };
        return Project;
    },
};