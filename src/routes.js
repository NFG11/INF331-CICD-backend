const router = require('express').Router();

const {
    getContacts,
    getContact,
    newContact,
    updateContact,
    deleteContact
} = require("./controllers");

router.get('/api/contacts', getContacts);
router.get('/api/contact/:id', getContact);
router.post('/api/contact/', newContact);
router.patch('/api/contact/:id', updateContact);
router.delete('/api/contact/:id', deleteContact);

module.exports = router;