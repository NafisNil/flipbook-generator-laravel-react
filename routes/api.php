<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Flipbook;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/flipbooks/{flipbook}', function (Flipbook $flipbook) {
    // Convert relative paths (/storage/flipbooks/...) to absolute URLs
    $absoluteUrls = array_map(function ($path) {
        return url($path);
    }, $flipbook->page_images);

    return response()->json([
        'id' => $flipbook->id,
        'title' => $flipbook->title,
        'total_pages' => $flipbook->total_pages,
        'page_images' => $absoluteUrls,
    ]);
});
