// const {createLogger , transports , format}= require('winston')
// const { collection } = require('../models/product')

// const logger = createLogger({
//     transports:[
//         new transports.Console(
//             {
//                 level:'info',
//                 // format:format.combine(format.timestamp(),format.json())
//                 format:format.combine(format.timestamp(),format.simple())


//             }
//         ),
        
//         new transports.File(
//             {
//                 filename:'store.log',
//                 level:'info',
//                 format:format.combine(format.timestamp(),format.simple())

//             }
//         ) 
//     ]
// })

// module.exports = logger

const {createLogger , transports , format } = require('winston')

const logger = createLogger({
    transports:[
        new transports.Console({
            level:'info',
            format:format.combine(format.timestamp(), format.json())
        }),

        new transports.File({
               filename:'data.log',
               level:'error',
               format:format.combine(format.timestamp(),format.json())
        }),
        new transports.File({
            filename:'data1.log',
            level:'warn',
            format:format.combine(format.timestamp(), format.simple())
        })
    ]
})

module.exports = logger;


