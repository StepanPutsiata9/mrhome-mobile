const data=
[
    {
        "type": "electro",
        "deviceId":"smart_switch",
        "payload":{
            "title":"Умный выключатель",
            "deviceType": "switch",   
            "state":"Включена",
        }
      },
      {
        "type": "electro",
        "deviceId":"smart_light",
        "payload":{
            "title":"Умная подсветка",
            "deviceType": "light",   
            "state":"Включена",
            "color":' #-1b018e639c-2635f4',    
            "brightness":"70",
            "glow":"Свечение",
        }
      },
      {
        "type": "electro",
        "topic":"smart_curtain",
        "payload":{
            "title":"Умная роль-штора",
            "deviceType": "curtain",
            "deviceId":"curtain1", 
            "state":"Закрыта",
        }
      },
      {
        "type": "sensor",
        "deviceId":"smart_tempSensor",
        "payload":{
            "title":"Датчик температуры",
            "deviceType": "tempSensor",   
            "state":"Включен",
            "temp":"25",
        }
      },
      {
        "type": "sensor",
        "deviceId":"smart_moveSensor",
        "payload":{
            "title":"Датчик движения",
            "deviceType": "moveSensor",   
            "state":"Включен",
            "lastMove":"23.05 18:25",
        }
      },
]


const data2={
    type:"initial",
    dataObj:{
    electro:[
        {
            id:1,
            deviceId: "light1",
            deviceType: "light",
            title:'Умная подсветка',
            state:'Включена',
            color:' #-1b018e639c-2635f4',    
            brightness:70,
            glow:'Свечение',
        },
        {
            id:2,
            deviceId: "switch1",
            deviceType: "switch",
            title:"Умный выключатель",
            state:'Включен',
        },
        {
            id:3,
            deviceId: "curtain1",
            deviceType: "curtain",
            title:"Умная роль-штора",
            state:'Закрыта'
        },
    ],
    sensors:[
        {
            id:4,
            deviceId: "tempSensor1",
            deviceType: "tempSensor",
            title:"Датчик температуры",
            state:'Включен',
            temp:25,
        },
        {
            id:5,
            deviceId: "moveSensor1",
            deviceType: "moveSensor",
            title:"Датчик движения",
            state:'Выключен',
            lastMove:'23.05 18:25'
        },
    ],
}
}