<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 26.10.2016
 * Time: 18:49
 */

namespace App\Guards;


use App\User;
use Illuminate\Auth\GuardHelpers;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Validation\UnauthorizedException;
use Lcobucci\JWT\Signer\Hmac\Sha256;

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

    /**
     * JwtGuard constructor.
     * @param UserProvider $provider
     */
    public function __construct(UserProvider $provider)
    {
        $this->key = config('jwt.cookie_key');
        //$this->request = $request;
        $this->provider = $provider;
        $this->algo = new Sha256();
    }

    /**
     * @return mixed
     */
    public function user()
    {
        if(!is_null($this->user)) {
            return $this->user;
        }
        $user = null;

        $token = $this->getJwt();
        if(!empty($token))
        {
            $user = User::findByEmail($token->getClaim('email'));

        }

        return $this->user = $user;
    }

    /**
     *
     * @param array $credentials
     * @return mixed
     */
    public function validate(array $credentials = [])
    {
        if (empty($credentials[$this->key])) {
            return false;
        }

        $credentials = [$this->key => $credentials[$this->key]];

        if ($this->provider->retrieveByCredentials($credentials)) {
            return true;
        }

        return false;
    }

    /**
     *
     */
    public function attempt(array $credentials = [], $remember = false, $login = false)
    {
        $user = User::findByEmail($credentials['email']);
        if ($user) {
            $this->setUser($user);
            return true;
        }

        return false;
    }
    
    public function logout()
    {
        Cookie::queue(Cookie::forget($this->key));
        $this->user = null;

        return true;
    }
    
    public function getJwt()
    {
        if(is_null($this->token)) {
            if(!Cookie::has($this->key)) {return false;}
            $this->token = (new \Lcobucci\JWT\Parser())->parse((string) \Cookie::get('x-access-token'));
        }
        return $this->token;
    }

    public function is_validJwt($token = null)
    {
        if(is_null($token)) {
            $token = $this->getJwt();
        }

        return $token->verify($this->algo, config('jwt.secret'));

    }

    /**
     * Determine if the user matches the credentials.
     *
     * @param  mixed  $user
     * @param  array  $credentials
     * @return bool
     */
    protected function hasValidCredentials($user, $credentials)
    {
        return ! is_null($user) && $this->provider->validateCredentials($user, $credentials);
    }


}