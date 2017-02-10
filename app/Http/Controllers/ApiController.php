<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    protected $statusCode = 200;

    public function respond($data = [], $meta = [], $headers = [])
    {
        return response()->json(
            [
                'data' => $data,
                '_meta' => $meta
            ],
            $this->getStatusCode(),
            $headers
        );
    }

    public function getStatusCode()
    {
        return $this->statusCode;
    }

    public function setStatusCode($code)
    {
        $this->statusCode = $code;
        return $this;
    }
}
