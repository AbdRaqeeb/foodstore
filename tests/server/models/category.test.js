import slugify from "slugify";
import Category from "../../../models/Category.js";
import {connect, disconnect} from "../../utils/mongoose.js";

let category = {
    name: 'Grains',
    description: 'grainy foods',
    numProducts: 5
};

let createdCat;

beforeAll(async () => {
    await connect();
});

beforeEach(async () => {
    await Category.deleteMany({});
});

describe('Category Model',  () => {
    it('should add slug before saving', async () => {
        createdCat = await Category.create(category);
        let slug = slugify(category.name, {lower: true});

        expect(createdCat.slug).toEqual(slug);
    });
});


afterAll(async () => {
    await Category.deleteMany({});
    await disconnect();
});