<?php

return [
    // "twilio", "sms.ru", "array"
    'driver' => env('SMS_DRIVER', 'twilio'),

    'drivers' => [
        'twilio' => [
            'account_sid' => env('TWILIO_SID'),
            'auth_token' => env('TWILIO_AUTH_TOKEN'),
            'from_number' => env('TWILIO_PHONE_NUMBER'),
        ],
        'sms.ru' => [
            'app_id' => env('SMS_SMS_RU_APP_ID'),
            'url' => env('SMS_SMS_RU_URL'),
        ],
    ],
];