<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyAnswer extends Model
{
    use HasFactory;

    protected $fillable=['user_id','survey_id','question_id','answer'];

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }

    public function survey(){
        return $this->belongsTo(Survey::class,'survey_id');
    }
}
