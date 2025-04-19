const events=[
    {
        deviceId:data.deviceId,
        deviceType:data.deviceType,
        command:'turn_on'
    },
    {
        deviceId:data.deviceId,
        deviceType:data.deviceType,
        command:'turn_off'
    },
    {
        deviceId:data.deviceId,
        deviceType:data.deviceType,
        command:'set_params',
        params: {
            color:color,
            brightness:sliderValue,
            glow:selectedItem
        }
    },
]

// {
    //   "deviceId": "curtain1",
    //   "deviceType": "curtain",
    //   "command": "set_position",
    //   "params": {
    //     "position": 80
    //   }
    // }