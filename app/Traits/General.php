<?php

namespace App\Traits;

trait General {

    /**
     * User groups
     */
    public function groups()
    {
        return [
            ['id' => 1, 'name' => 'Administrator', 'description' => 'Administrators'],
            ['id' => 2, 'name' => 'User', 'description' => 'Users'],
        ];
    }

    /**
     * Group name
     */
    public function getGroupName($id)
    {
        $groups = $this->groups();

        $group = collect($groups)->filter(function($group) use ($id) {
            return ($group['id']==$id);
        });

        return $group->all()[0]['name'];
    }

}