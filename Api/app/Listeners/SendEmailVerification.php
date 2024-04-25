<?php

namespace App\Listeners;

use App\Events\UserEmailVerification;
use App\Mail\EmailVerification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Mail;

class SendEmailVerification
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UserEmailVerification $event): void
    {
        Mail::to($event->email)->send(new EmailVerification([
            'toEmail' => $event->email,
            'subject' => 'Verificação de e-mail',
            'message' => Crypt::encryptString($event->email)
        ]));
    }
}
