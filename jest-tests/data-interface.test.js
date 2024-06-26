
console.log(`resolve modules from [${process.env.NODE_PATH}]`);

const dataInterface = require("../data-interface");

describe(`listUsers`, () => {
    it(`result should not be empty and each should include an id field`, async () => {
        const users = await dataInterface.listUsers();

        expect(users.length).toBeGreaterThan(0);
        
        for (user of users) {
            expect(user).toEqual(expect.objectContaining({
                id: expect.any(String)
            }));
        }
    });
});

describe(`fetchUser`, () => {
    it(`result should not be empty and each should include an id field`, async () => {
        const users = await dataInterface.listUsers();
        const firstUserId = users[0].id;
        const targetUser = await dataInterface.fetchUser(firstUserId);

        expect(targetUser).not.toBeNull();
        expect(targetUser.id).toEqual(firstUserId);
    });
});

describe(`createUser`, () => {
    it(`result should have original fields including new id field`, async () => {
        const preCreateUsersList = await dataInterface.listUsers();
        const user = {
            firstName: "Koos", lastName: "de Doos",
            email: "koos.doos@lambda.aws", phone: "+00 00 000 0004"
        };
        const newUser = await dataInterface.createUser(user);
        const postCreateUsersList = await dataInterface.listUsers();

        expect(newUser).not.toBeNull();
        expect(newUser.id).not.toBeNull();
        expect(newUser.id).toEqual(expect.any(String));
        expect(newUser.firstName).toEqual(user.firstName);
        expect(newUser.lastName).toEqual(user.lastName);
        expect(newUser.email).toEqual(user.email);
        expect(newUser.phone).toEqual(user.phone);
        expect(postCreateUsersList.length).toEqual(preCreateUsersList.length + 1);
    });
});

describe(`createUser`, () => {
    it(`result should have original fields including new id field`, async () => {
        const userId = "872b923c-5eb3-4ef6-b2bb-58fbb5b20c68";
        const user = {
            email: "pot.piempies@gmail.com",
            phone: "+00 00 000 0006"
        };
        const originalUser = await dataInterface.fetchUser(userId);
        const updatedUser = await dataInterface.updateUser(userId, user);

        expect(updatedUser).not.toBeNull();
        expect(updatedUser.id).not.toBeNull();
        expect(updatedUser.id).toEqual(expect.any(String));
        expect(updatedUser.firstName).toEqual(originalUser.firstName);
        expect(updatedUser.lastName).toEqual(originalUser.lastName);
        expect(updatedUser.email).toEqual(user.email);
        expect(updatedUser.phone).toEqual(user.phone);
    });
});
