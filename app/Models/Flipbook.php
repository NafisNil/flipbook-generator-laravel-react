<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Flipbook extends Model
{
    //
    protected $fillable = ['title', 'total_pages', 'page_images'];

    protected $casts = [
        'page_images' => 'array',
    ];
}
