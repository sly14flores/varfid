<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Traits\General;

class UserSelections extends Controller
{
    use General;

    public function userGroups()
    {
        return $this->groups();
    }
}
