<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Survey extends Model
{
    use HasFactory, HasSlug;
    protected $fillable=['user_id','title','image','slug','status','description','expire_date'];

    //save slug
    public function getSlugOptions(): SlugOptions
    {
       return SlugOptions::create()->generateSlugsFrom('title')->saveSlugsTo('slug');
    }

//    public function getImageAttribute($value){
//        return $value ? URL::to($value) : null;
//    }
}
