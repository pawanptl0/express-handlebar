const express = require('express')
const router = express.Router()
const members = require('../../members')
const uuid = require('uuid')

// get all members which is in JSON data
router.get('/', (req, res) => {
  res.json(members)
})

// update single members which is in JSON data
router.put('/:id', (req, res) => {
  let found = members.some(mem => mem.id === Number(req.params.id))
  if (found) {
    members.map(mem => {
      if (mem.id === Number(req.params.id)) {
        mem.name = req.body.name;
        mem.email = req.body.email
      }
    })

    res.json({ msg: 'member updated', mem, old: req.body })
  } else {
    res.status(400).json({ msg: `No Member Found!` })
  }
})

// get single members which is in JSON data
router.get('/:id', (req, res) => {
  let found = members.some(mem => mem.id === Number(req.params.id))
  if (found) {
    res.json(members.filter(mem => mem.id === Number(req.params.id)))
  } else {
    res.status(400).json({ msg: `No Member Found!` })
  }
})

// delete single members which is in JSON data
router.delete('/:id', (req, res) => {
  let found = members.some(mem => mem.id === Number(req.params.id))
  if (found) {
    res.json({ msg: 'Member Deleted!', members: members.filter(mem => mem.id !== Number(req.params.id)) })
  } else {
    res.status(400).json({ msg: `No Member Found!` })
  }
})

//Post request for
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  }

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: 'Bad Request' })
  }

  members.push(newMember)
  //res.json(members) //it can be used if you are not using templaetg
  res.redirect('/')
})

module.exports = router