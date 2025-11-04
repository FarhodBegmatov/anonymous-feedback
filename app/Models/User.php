<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphTo as MorphToAlias;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

/**
 * @property mixed $manageable
 * @property mixed $manageable_type
 * @property mixed $role
 * @property mixed $id
 * @method static where(string $string, string $string1)
 * @method static create(array $data)
 * @method static select(string $string)
 * @var Faculty|Department|Manager|null $manageable
 */
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass-assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'manageable_type',
        'manageable_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function manageable(): MorphToAlias
    {
        return $this->morphTo();
    }

    public function isFacultyManager(): bool
    {
        return $this->manageable_type === Faculty::class;
    }

    public function isDepartmentManager(): bool
    {
        return $this->manageable_type === Department::class;
    }

    // To easily check the role
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isManager(): bool
    {
        return $this->role === 'manager';
    }

}
