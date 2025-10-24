<?php

namespace App\Services\Sms;

use Twilio\Rest\Client;

class TwilioSender implements SmsSender
{
    private $client;
    private $from;

    public function __construct(string $accountSid, string $authToken, string $fromNumber)
    {
        if (empty($accountSid) || empty($authToken) || empty($fromNumber)) {
            throw new \InvalidArgumentException('Twilio credentials must be set.');
        }

        $this->client = new Client($accountSid, $authToken);
        $this->from = $fromNumber;
    }

    public function send($number, $text): void
    {
        $this->client->messages->create(
            '+' . trim($number, '+'),
            [
                'from' => $this->from,
                'body' => $text
            ]
        );
    }
}
