<?php

namespace App\Listeners;

use App\Events\RecoverPassword;
use App\Mail\EmailRecoverPassword;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendTokenRecover
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
    public function handle(RecoverPassword $event): void
    {
        Mail::to($event->email)->send(new EmailRecoverPassword([
            'toEmail' => $event->email,
            'token' => $event->token,
            'expiration_hours' => "10 minutos",
            'subject' => 'Recuperação de senha',
        ]));
    }
}
