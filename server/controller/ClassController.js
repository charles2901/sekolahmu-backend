const { Class } = require('../models')
const jsonParse = require('../helpers/parseJSON')

class ClassController{
    static async createClass(req, res, next){
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
        try{
            const newClass = await Class.create({rows, columns, teacher, available_seats, occupied_seats})
            res.status(200).json(newClass)
        }
        catch(err){
            next(err)
        }
        
        
        
    }

    static async findOne(req, res, next){
        const {id} = req.params
        try{
            const detailCLass = await ClassController.findOneWithArgs(id)
            if(!detailCLass){
                next({name: 'NOT_FOUND'})
            } else {
                res.status(200).json(detailCLass)
            }
        }
        catch(err){
            next(err)
        }
    }

    static findOneWithArgs(args){
        const detailClass = Class.findOne({where: { id : args }})
        return detailClass
    }

    static async findAll(req, res, next){
        try{
            const listClasses = await Class.findAll({ attributes : ['id', 'available_seats']})
            res.status(200).json(listClasses)
        }
        catch(err){
            next(err)
        }
    }

    static async checkin(req, res, next){
        const {id} = req.params
        const selectedClass = await ClassController.findOneWithArgs(id)
        try{
            const parseJSONSeat = selectedClass.occupied_seats.map(seat => JSON.parse(seat))
            switch(req.userData.role){
                case "pengajar" :
                    if(selectedClass.teacher === "in"){
                        res.status(400).json({...selectedClass.dataValues, occupied_seats : parseJSONSeat, message: "Sorry, there is already teacher in this classroom"})
                    } else {
                        await Class.update({teacher: "in"}, {where: {id}})
                        const updatedClass = await ClassController.findOneWithArgs(id)
                        res.status(400).json({...updatedClass.dataValues, occupied_seats : jsonParse(updatedClass.dataValues.occupied_seats), message: `${req.userData.name} has checkin to class`})
                    }
                case "murid" :
                    if(!selectedClass.available_seats.length){
                        res.status(400).json({...cl.dataValues, occupied_seats : parseJSONSeat , message: `Hi ${req.userData.name}, the class is fully seated`})
                    } else{
                        let flagStudent = parseJSONSeat.filter(seat => seat.student_name === req.userData.name)
                        let selectedSeat = ""
                        if(!flagStudent.length){
                            selectedSeat = selectedClass.dataValues.available_seats[0]
                            await Class.update({ available_seats : selectedClass.available_seats.slice(1), occupied_seats: [...selectedClass.dataValues.occupied_seats, JSON.stringify({ "seat" : selectedClass.available_seats[0], "student_name" : req.userData.name })]}, {where: {id}})
                            const updatedClass = await ClassController.findOneWithArgs(id)
                            res.status(400).json({...updatedClass.dataValues, occupied_seats : jsonParse(updatedClass.dataValues.occupied_seats), message: `Hi ${req.userData.name}, your seat is ${selectedSeat}`})
                        } else {
                            res.status(400).json({...selectedClass.dataValues, occupied_seats : parseJSONSeat , message: `Hi ${req.userData.name}, you already checkin this class`})
                        }
                    }
                case "admin" :
                    res.status(200).json({...selectedClass.dataValues, occupied_seats: parseJSONSeat})
                default :
                    res.status(404).json({message: "Service is unavailable"})
            }
        }

        catch(err){
            next(err)
        }
    }

    static async checkout(req, res, next){
        const {id} = req.params
        const selectedClass = await ClassController.findOneWithArgs(id)
        try{
            const parseJSONSeat = selectedClass.occupied_seats.map(seat => JSON.parse(seat))
            switch(req.userData.role){
                case "pengajar" :
                    if(selectedClass.teacher === "out"){
                        res.status(400).json({...selectedClass.dataValues, occupied_seats : parseJSONSeat, message: "Sorry, you haven't checkin yet in this classroom"})
                    } else {
                        await Class.update({teacher: "out"}, {where: {id}})
                        const updatedClass = await ClassController.findOneWithArgs(id)
                        res.status(400).json({...updatedClass.dataValues, occupied_seats : jsonParse(updatedClass.dataValues.occupied_seats), message: `${req.userData.name} has checkout from class`})
                    }
                case "murid" :
                    let flagStudent = parseJSONSeat.filter(seat => seat.student_name === req.userData.name)
                    if(!flagStudent.length){
                        res.status(400).json({...selectedClass.dataValues, occupied_seats: parseJSONSeat, message: `Hi ${req.userData.name}, you haven't checkin in this classroom yet`})
                    } else {
                        let checkoutSeat = parseJSONSeat.filter(el => el.student_name === req.userData.name)[0].seat
                        await Class.update({ available_seats : [...selectedClass.dataValues.available_seats, checkoutSeat], occupied_seats: parseJSONSeat.filter(el => el.seat !== checkoutSeat).map(element => JSON.stringify(element))}, {where: {id}})
                        const updatedClass = await ClassController.findOneWithArgs(id)
                        res.status(200).json({...updatedClass.dataValues, occupied_seats : jsonParse(updatedClass.dataValues.occupied_seats), message: `Hi ${req.userData.name}, ${checkoutSeat} is now available for other students`})
                    }
                    case "admin" :
                        res.status(200).json({...selectedClass.dataValues, occupied_seats: parseJSONSeat})
                        default : 
                        res.status(404).json({message: "Service is unavailable"})
                    }
                } 
        catch(err){
            next(err)
        }
    }

}

module.exports = ClassController