<?php

namespace App\Providers;

use App\Events\RecoverPassword;
use App\Events\UserEmailVerification;
use App\Listeners\SendEmailVerification;
use App\Listeners\SendTokenRecover;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        UserEmailVerification::class =>[
            SendEmailVerification::class,
        ],
        RecoverPassword::class =>[
            SendTokenRecover::class,
        ],
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}