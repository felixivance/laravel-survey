<?php

namespace App\Http\Controllers;

use App\Models\SurveyAnswer;
use Illuminate\Http\Request;

class SurveyAnswerController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'survey_id' => 'required|integer',
            'question_id' => 'required|integer',
            'answer' => 'required|string',
        ]);
        $surveyAnswer = SurveyAnswer::create($request->all());
        return response()->json($surveyAnswer, 201);
    }

    public function show($id)
    {
        $surveyAnswer = SurveyAnswer::find($id);
        return response()->json($surveyAnswer, 200);
    }


}
