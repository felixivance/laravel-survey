<?php

namespace App\Http\Controllers;

use App\Models\SurveyQuestionAnswer;
use Illuminate\Http\Request;

class SurveyQuestionAnswerController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'survey_id' => 'required|integer',
            'question_id' => 'required|integer',
            'answer' => 'required|string',
        ]);
        $surveyQuestionAnswer = SurveyQuestionAnswer::query()->create($request->all());
        return response()->json($surveyQuestionAnswer, 201);
    }

    public function show($id)
    {
        $surveyQuestionAnswer = SurveyQuestionAnswer::query()->find($id);
        return response()->json($surveyQuestionAnswer, 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'survey_id' => 'required|integer',
            'question_id' => 'required|integer',
            'answer' => 'required|string',
        ]);
        $surveyQuestionAnswer = SurveyQuestionAnswer::query()->find($id);
        $surveyQuestionAnswer->update($request->all());
        return response()->json($surveyQuestionAnswer, 200);
    }

    public function delete($id)
    {
        $surveyQuestionAnswer = SurveyQuestionAnswer::query()->find($id);
        $surveyQuestionAnswer->delete();
        return response()->json(null, 204);
    }

}
