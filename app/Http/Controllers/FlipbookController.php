<?php

namespace App\Http\Controllers;

use App\Models\Flipbook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Process;
use Inertia\Inertia;

class FlipbookController extends Controller
{
    //
    public function index()
    {
        $flipbooks = Flipbook::latest()->get();
        return Inertia::render('Flipbooks/Index', [
            'flipbooks' => $flipbooks,
        ]);
    }


    public function create()
    {
        return Inertia::render('Flipbooks/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'pdf' => 'required|file|mimes:pdf|max:20480',
        ]);

        $file = $request->file('pdf');
        $fullPdfPath = $file->getRealPath();

        $folderName = time().'-'.uniqid();
        $destinationPath = storage_path('app/public/flipbooks/'.$folderName);

        if (!File::exists($destinationPath)) {
            File::makeDirectory($destinationPath, 0755, true);
        }

        // Path to pdftoppm executable in Laragon
        $popplerPath = 'C:\\laragon\\bin\\poppler\\Library\\bin\\pdftoppm.exe';
        $outputPrefix = $destinationPath.'/page';

        // Convert PDF pages to PNG directly (-png -r 150 DPI resolution)
        $process = Process::run("\"{$popplerPath}\" -png -r 150 \"{$fullPdfPath}\" \"{$outputPrefix}\"");

        if ($process->failed()) {
            return back()->withErrors(['pdf' => 'PDF conversion failed: '.$process->errorOutput()]);
        }

        // Collect all converted page images (pdftoppm creates page-1.png, page-2.png, etc.)
        $files = File::glob($destinationPath.'/page-*.png');
        sort($files, SORT_NATURAL); // Sort pages in natural order (page-1, page-2, ..., page-10)

        $imageUrls = [];
        foreach ($files as $filePath) {
            $imageUrls[] = 'storage/flipbooks/'.$folderName.'/'.basename($filePath);
        }

        $flipbook = Flipbook::create([
            'title' => $request->title,
            'total_pages' => count($imageUrls),
            'page_images' => $imageUrls,
        ]);

        return redirect()->route('flipbooks.index');
    }

    public function show(Flipbook $flipbook)
    {
        return Inertia::render('Flipbooks/Show', [
            'flipbook' => $flipbook,
        ]);
    }

}
