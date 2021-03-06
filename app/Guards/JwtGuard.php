<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 26.10.2016
 * Time: 18:49
 */

namespace App\Guards;


use App\Models\User;
use Illuminate\Auth\GuardHelpers;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Request;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Builder;

/**
 * Class JwtGuard
 * @package App\Guards
 */
class JwtGuard implements Guard
{

    use GuardHelpers;
    /**
     * @var
     */
    protected $request;

    /**
     * @var
     */
    protected $key;

    /**
     * JwtGuard constructor.
     */

    protected $algo;

    protected $token = null;

    protected $prefix = 'bearer';

    protected $lastAttempted;

    /**
     * JwtGuard constructor.
     * @param UserProvider $provider
     */
    public function __construct(UserProvider $provider)
    {
        $this->key = config('jwt.cookie_key');
        $this->provider = $provider;
        $this->algo = new Sha256();
    }

    /**
     *
     * @param array $credentials
     * @return mixed
     */
    public function validate(array $credentials = [])
    {
        return $this->attempt($credentials, false, false);
    }

    /**
     * @param array $credentials
     * @param bool $remember
     * @param bool $login
     * @return bool
     */
    public function attempt(array $credentials = [], $remember = false, $login = true)
    {
        $this->lastAttempted = $user = $this->provider->retrieveByCredentials($credentials);

        if ($this->hasValidCredentials($user, $credentials)) {
            if ($login) {
                $this->login($user);
            }
            return true;
        }
        return false;
    }

    /**
     * @param null $user
     * @param bool $remember
     */
    protected function assignToken($user = null, $remember = false)
    {
        if (!$user) {
            $user = $this->user();
        }

        $token = (new Builder())
            ->set('email', $user->email)
            ->sign(new Sha256(), config('jwt.secret'))
            ->getToken();

        Cookie::queue('x-access-token', (string)$token, $remember ? config('jwt.ttl') : 0, null, null, false, false);
    }

    /**
     * @return mixed
     */
    public function user()
    {
        if (!is_null($this->user)) {
            return $this->user;
        }
        $user = null;

        $token = $this->getJwt();
        if (!empty($token)) {
            if ($this->is_validJwt()) {
                if (!$user = User::findByEmail($token->getClaim('email'))) {
                    $this->logout();
                }
            }
        }

        return $this->user = $user;
    }

    /**
     * @return bool|\Lcobucci\JWT\Token|null
     */
    public function getJwt()
    {
        if (is_null($this->token)) {
            try {
                if (Request::header('Authorization')) {
                    $this->token = (new \Lcobucci\JWT\Parser())->parse(trim(str_ireplace($this->prefix, '', Request::header('Authorization'))));
                } else if (Cookie::has($this->key)) {
                    $this->token = (new \Lcobucci\JWT\Parser())->parse((string)\Cookie::get('x-access-token'));
                }
            } catch (\InvalidArgumentException $ex) {
                $this->token = false;
            } finally {
                return $this->token;
            }
        }
        return $this->token;
    }

    /**
     * @param null $token
     * @return bool
     */
    public function is_validJwt($token = null)
    {
        if (is_null($token)) {
            $token = $this->getJwt();
        }

        return $this->token ? $token->verify($this->algo, config('jwt.secret')) : false;

    }

    /**
     * @return bool
     */
    public function logout()
    {
        Cookie::queue(Cookie::forget($this->key));
        $this->user = null;

        return true;
    }

    public function login(Authenticatable $user)
    {
        $this->setUser($user);
        $this->assignToken($user);
    }

    /**
     * Determine if the user matches the credentials.
     *
     * @param  mixed $user
     * @param  array $credentials
     * @return bool
     */
    protected function hasValidCredentials($user, $credentials)
    {
        return !is_null($user) && $this->provider->validateCredentials($user, $credentials);
    }

}