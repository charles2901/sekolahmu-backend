const { Class } = require('../models')

class ClassController{
    static createClass(req, res, next){
        const { rows, columns } = req.body
        const alphabet = String.fromCharCode(...Array(123).keys()).slice(97).toUpperCase()
        const teacher = 'out'
        const available_seats = []
        const occupied_seats = []
        for(let i = 1; i <= rows; i++){
            for(let j = 0; j < columns; j++){
                available_seats.push(i + alphabet[j])
            }
        }
        Class.create({rows, columns, teacher, available_seats, occupied_seats})
        .then((createdClass) => {
            res.status(200).json(createdClass)
        })
        .catch(err => {
            next(err)
        })
        
    }

    static findOne(req, res, next){
        const {id} = req.params
        Class.findOne({where: { id }})
        .then(cl => {
            res.status(200).json(cl)
        })
        .catch(err => {
            next(err)
        })
    }

    static findAll(req, res, next){
        Class.findAll({ attributes : ['id', 'available_seats']})
        .then(classes => {
            res.status(200).json(classes)
        })
        .catch(err => {
            next(err)
        })
    }

    static checkin(req, res, next){
        const {id} = req.params
        
        if(req.userData.role === "pengajar"){
            Class.findOne({where: {id}})
            .then(cl => {
                if(cl.teacher === "in"){
                    throw res.status(400).json({...cl.dataValues, message: "Sorry, there is already teacher in this classroom"})
                } else {
                    return Class.update({teacher: 'in'}, {where: {id}})
                }
            })
            .then(() => {
                return Class.findOne({where: {id}})
            })
            .then(cl => {
                res.status(200).json({...cl.dataValues, message: `Guru ${req.userData.name} has checkin to class`})
            })
            .catch(err => {
                next(err)
            })
        } else if(req.userData.role === "murid"){
            let selectedSeat = ''
            Class.findOne({where: {id}})
            .then(cl => {
                if(cl.available_seats.length === 0){
                    let parseJSONSeat = cl.occupied_seats.map(el => JSON.parse(el))
                    throw res.status(400).json({...cl.dataValues, occupied_seats : parseJSONSeat , message: `Hi ${req.userData.name}, the class is fully seated`})
                } else {
                    let parseJSONSeat = cl.occupied_seats.map(el => JSON.parse(el))
                    const checkAlrInClass = parseJSONSeat.filter(el => el.student_name === req.userData.name)
                    if(checkAlrInClass.length === 0){
                        selectedSeat = cl.dataValues.available_seats[0]
                        return Class.update({ available_seats : cl.available_seats.slice(1), occupied_seats: [...cl.dataValues.occupied_seats, JSON.stringify({ "seat" : cl.available_seats[0], "student_name" : req.userData.name })]}, {where: {id}})
                    } else {
                        throw res.status(400).json({...cl.dataValues, occupied_seats : parseJSONSeat , message: `Hi ${req.userData.name}, you already checkin this class`})
                    }
                }
            })
            .then(() => {
                return Class.findOne({where: {id}})
            })
            .then(cl => {
                let parseJSONSeat = cl.occupied_seats.map(el => JSON.parse(el))
                res.status(200).json({...cl.dataValues, occupied_seats : parseJSONSeat , message: `Hi ${req.userData.name}, your seat is ${selectedSeat}`})
            })
            .catch(err => {
                next(err)
            })
        } else {
            Class.findOne({where: {id}})
            .then(cl =>{
                let parseJSONSeat = cl.occupied_seats.map(el => JSON.parse(el))
                res.status(200).json({...cl.dataValues, occupied_seats : parseJSONSeat})
            })
        }
    }

    static checkout(req, res, next){
        const {id} = req.params
        
        if(req.userData.role === "pengajar"){
            Class.findOne({where: {id}})
            .then(cl => {
                if(cl.teacher === "out"){
                    res.status(404).json({...cl.dataValues, message: "Sorry, you haven't checkin yet in this classroom"})
                } else {
                    return Class.update({teacher: 'out'}, {where: {id}})
                }
            })
            .then(resp => {
                res.status(200).json(resp)
            })
            .catch(err => {
                next(err)
            })
        } else if(req.userData.role ==="murid"){
            let checkoutSeat = ''
            Class.findOne({where: {id}})
            .then(cl => {
                let parseJSONSeat = cl.occupied_seats.map(el => JSON.parse(el))
                let checkInClass = parseJSONSeat.filter(el => el.student_name === req.userData.name)
                if(checkInClass.length === 0){
                    let parseJSONSeat = cl.occupied_seats.map(el => JSON.parse(el))
                    throw res.status(400).json({...cl.dataValues, occupied_seats : parseJSONSeat ,message: `Hi ${req.userData.name}, you haven't checkin in this classroom yet`})
                } else {
                    checkoutSeat = checkInClass[0].seat
                    return Class.update({ available_seats : [...cl.dataValues.available_seats, checkoutSeat], occupied_seats: parseJSONSeat.filter(el => el.seat !== checkoutSeat).map(element => JSON.stringify(element))}, {where: {id}})
                }
            })
            .then(() => {
                return Class.findOne({where: {id}})
            })
            .then(cl => {
                let parseJSONSeat = cl.occupied_seats.map(el => JSON.parse(el))
                res.status(200).json({...cl.dataValues, occupied_seats : parseJSONSeat , message: `Hi ${req.userData.name}, ${checkoutSeat} is now available for other students`})
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
        } else {
            Class.findOne({where: {id}})
            .then(cl =>{
                let parseJSONSeat = cl.occupied_seats.map(el => JSON.parse(el))
                res.status(200).json({...cl.dataValues, occupied_seats : parseJSONSeat})
            })
        }
    }
}

module.exports = ClassController