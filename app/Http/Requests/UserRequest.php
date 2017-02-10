<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        switch ($this->method()) {
            case 'PATCH':
            case 'PUT':
                return [
                    'name' => 'required|min:1',
                    'email' => 'required|email',
                    'password' => 'min:6|confirmed',
                    'password_confirmation' => 'min:6',
                ];
            default:
                return [];
        }
    }
}
