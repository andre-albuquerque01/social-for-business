<?php

namespace App\Jobs;

use App\Events\RecoverPassword;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class RecoverPasswordJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $email, $token;

    /**
     * Create a new job instance.
     */
    public function __construct(string $email, string $token)
    {
        $this->email = $email;
        $this->token = $token;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        event(new RecoverPassword($this->email, $this->token));
    }
}
