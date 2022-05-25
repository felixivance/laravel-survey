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
    protected $appends=['image_url'];

    const TYPE_TEXT="text";
    const TYPE_TEXTAREA="textarea";
    const TYPE_SELECT="select";
    const TYPE_RADIO="radio";
    const TYPE_CHECKBOX="checkbox";


    //save slug
    public function getSlugOptions(): SlugOptions
    {
       return SlugOptions::create()->generateSlugsFrom('title')->saveSlugsTo('slug');
    }

    public function getImageUrlAttribute(){
        return $this->image ? URL::to($this->image) : null;
//        return $value ? URL::to($value) : null;
    }

    public function questions(){
        return $this->hasMany(SurveyQuestion::class, 'survey_id');
    }

    public function getStatusAttribute($value){
        return $value == 'active';
    }
}
