<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Track extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'original_filename',
        'url',
        'title',
        'artist',
        'album',
        'year',
        'genre'
    ];

    /**
     * Save track from dropzone uploading to storage
     *
     * @param \Illuminate\Http\UploadedFile $file
     * @return string $file
     */
    public static function saveFromDropzone($file)
    {
        $userId = \Auth::user()->id;
        $extension = $file->extension();
        $directory = "uploads/tracks/user$userId";
        $path = public_path($directory);
        if (!is_dir($path)) mkdir($path, 0777, true);
        $filename = self::generateUniqueName($file->getFilename());
        $filename .= '.mp3';
        try {
            $file->move($path, $filename);
            $track = self::create([
                'original_filename' => $file->getClientOriginalName(),
                'url' => "/$directory/$filename",
                'title' => null,
                'artist' => null,
                'album' => null,
                'year' => null,
                'genre' => null
            ]);
            return $track;
        }
        catch(Exeption $ex) {
            \Log::error($ex);
            return null;
        }
    }

    /**
     * Generate unique name
     *
     * @param string $filename
     * @return string
     */
    private static function generateUniqueName($filename)
    {
        return md5($filename . microtime());
    }

    /**
     * Delee model instance with file from disc
     *
     * @return void
     */
    public function deleteWithFile()
    {
        unlink(public_path($this->url));
        $this->delete();
    }

}
