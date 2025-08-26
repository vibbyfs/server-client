const express = require('express');
const router = express.Router();
const { validate } = require('../../middlewares/validate');
const { listRoomsQuery, createRoomBody, joinParams, joinBody, idParam } = require('./rooms.schema');
const ctl = require('./rooms.controller');

router.get('/rooms', validate(listRoomsQuery, 'query'), ctl.getRooms);
router.post('/rooms', validate(createRoomBody, 'body'), ctl.createRoom);
router.post('/rooms/:id/join', validate(joinParams, 'params'), ctl.postJoin);
router.get('/rooms/:id/participants', validate(idParam, 'params'), ctl.getParticipantsRoute);
router.get('/rooms/:id/winners', validate(idParam, 'params'), ctl.getWinnersRoute);
router.get('/rooms/:id/funfacts', validate(idParam, 'params'), ctl.getFunfacts);

module.exports = router;
