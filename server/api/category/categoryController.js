const Category = require('../../models/Category');
const router = require('express').Router();

router.get('/list', function (req, res, next) {
    Category.find({}, (err, categoryList) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error.'
            });
        }

        return res.send({
            success: true,
            message: 'Get Category List.',
            categoryList: categoryList
        });
    });
});

router.post('/', function (req, res, next) {
    const {
        body
    } = req;
    const {
        name,
        description
    } = body;

    if (!name) {
        return res.send({
            success: false,
            message: 'Error: Name cannot be blank.'
        });
    }

    const newCategory = new Category;
    newCategory.name = name;
    newCategory.description = description;
    newCategory.save((err, category) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error.'
            });
        }
        return res.send({
            success: true,
            message: 'Created New Category.',
            category: {
                id: category._id,
                name: category.name,
                description: category.description,
                createdAt: category.createdAt
            }
        });
    });
});

router.get('/', function (req, res, next) {
    const { query } = req;
    const { id } = query;

    Category.find({
        _id: id
    }, (err, category) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error.'
            });
        }

        if (category.length != 1) {
            return res.send({
                success: false,
                message: 'Error: No Category.'
            });
        } else {
            return res.send({
                success: true,
                message: 'Get Category.',
                category: category
            });
        }
    });
});

router.put('/', function (req, res, next) {
    const { body } = req;
    const {
        id,
        name,
        description
    } = body;

    if (!id) {
        return res.send({
            success: false,
            message: 'Error: ID is required.'
        });
    }
    if (!name) {
        return res.send({
            success: false,
            message: 'Error: Name is required.'
        });
    }

    Category.findByIdAndUpdate(id, {
        name: name,
        description: description
    }, (err, category) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error.'
            });
        }

        return res.send({
            success: true,
            message: 'Find And Updated!',
            category: category
        });
    });
});

router.delete('/', function (req, res, next) {
    const { query } = req;
    const { id } = query;

    if (!id) {
        return res.send({
            success: false,
            message: 'Error: ID is required.'
        });
    }

    Category.findByIdAndRemove(id, (err, category) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error.'
            });
        }

        return res.send({
            success: true,
            message: 'Removed Category.'
        });
    });
});

module.exports = router;