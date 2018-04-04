const Category = require('../../models/Category');
const Journalizing = require('../../models/Journalizing');
const router = require('express').Router();

router.get('/list', function (req, res, next) {
    // Journalizing.find({}, (err, journalizingList) => {
    //     if (err) {
    //         return res.send({
    //             success: false,
    //             message: 'Error: Server error.'
    //         });
    //     }
    //
    //     return res.send({
    //         success: true,
    //         message: 'Get Category List.',
    //         journalizingList: journalizingList
    //     });
    // });
    Journalizing.find({}).populate('category').exec(function (err, journalizingList) {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error.'
            });
        }

        return res.send({
            success: true,
            message: 'Get Category List.',
            journalizingList: journalizingList
        });
    });
});

router.post('/', function (req, res, next) {
    const {
        body
    } = req;
    const {
        datetime,
        option,
        category,
        amount,
        description
    } = body;

    if (!datetime) {
        return res.send({
            success: false,
            message: 'Error: Datetime cannot be blank.'
        });
    }
    if (!option) {
        return res.send({
            success: false,
            message: 'Error: Option cannot be blank.'
        });
    }
    if (!category) {
        return res.send({
            success: false,
            message: 'Error: Category cannot be blank.'
        });
    }
    if (!amount) {
        return res.send({
            success: false,
            message: 'Error: Amount cannot be blank.'
        });
    }

    const newJournalizing = new Journalizing;
    newJournalizing.datetime = datetime;
    newJournalizing.option = option;
    newJournalizing.category = category;
    newJournalizing.amount = amount;
    newJournalizing.description = description;
    newJournalizing.save((err, journalizing) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error.'
            });
        }
        return res.send({
            success: true,
            message: 'Created New Journalizing.',
            journalizing: {
                id: journalizing._id,
                datetime: journalizing.datetime,
                option: journalizing.option,
                category: journalizing.category,
                amount: journalizing.amount,
                description: journalizing.description,
                createdAt: journalizing.createdAt
            }
        });
    });
});

router.get('/', function (req, res, next) {
    const { query } = req;
    const { id } = query;

    // Journalizing.find({
    //     _id: id
    // }, (err, journalizing) => {
    //     if (err) {
    //         return res.send({
    //             success: false,
    //             message: 'Error: Server error.'
    //         });
    //     }
    //
    //     if (journalizing.length != 1) {
    //         return res.send({
    //             success: false,
    //             message: 'Error: No Journalizing.'
    //         });
    //     } else {
    //         return res.send({
    //             success: true,
    //             message: 'Get Journalizing.',
    //             journalizing: journalizing
    //         });
    //     }
    // });

    Journalizing.find({
        _id: id
    }).populate('category').exec(function (err, journalizing) {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error.'
            });
        }

        if (journalizing.length != 1) {
            return res.send({
                success: false,
                message: 'Error: No Journalizing.'
            });
        } else {
            return res.send({
                success: true,
                message: 'Get Journalizing.',
                journalizing: journalizing
            });
        }
    });
});

router.put('/', function (req, res, next) {
    const { body } = req;
    const {
        id,
        datetime,
        option,
        category,
        amount,
        description
    } = body;

    if (!datetime) {
        return res.send({
            success: false,
            message: 'Error: Datetime cannot be blank.'
        });
    }
    if (!option) {
        return res.send({
            success: false,
            message: 'Error: Option cannot be blank.'
        });
    }
    if (!category) {
        return res.send({
            success: false,
            message: 'Error: Category cannot be blank.'
        });
    }
    if (!amount) {
        return res.send({
            success: false,
            message: 'Error: Amount cannot be blank.'
        });
    }

    Journalizing.findByIdAndUpdate(id, {
        datetime: datetime,
        option: option,
        category: category,
        amount: amount,
        description: description
    }, (err, journalizing) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error.'
            });
        }

        return res.send({
            success: true,
            message: 'Find And Updated!',
            journalizing: journalizing
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

    Journalizing.findByIdAndRemove(id, (err, journalizing) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error.'
            });
        }

        return res.send({
            success: true,
            message: 'Removed Journalizing.'
        });
    });
});

module.exports = router;