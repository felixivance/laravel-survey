<?php

namespace App\Http\Controllers;

use App\Models\SurveyQuestion;
use Illuminate\Http\Request;

class SurveyQuestionController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'question' => 'required|string',
            'data' => 'required|string',
            'type' => 'required|string',
            'survey_id' => 'required|integer',
            'description' => 'nullable|string',
        ]);
        $surveyQuestion = SurveyQuestion::query()->create($request->all());
        return response()->json($surveyQuestion, 201);
    }

    public function show($id)
    {
        $surveyQuestion = SurveyQuestion::query()->find($id);
        return response()->json($surveyQuestion, 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'question' => 'required|string',
            'data' => 'required|string',
            'type' => 'required|string',
            'survey_id' => 'required|integer',
            'description' => 'nullable|string',
        ]);
        $surveyQuestion = SurveyQuestion::query()->find($id);
        $surveyQuestion->update($request->all());
        return response()->json($surveyQuestion, 200);
    }

    public function delete($id)
    {
        $surveyQuestion = SurveyQuestion::query()->find($id);
        $surveyQuestion->delete();
        return response()->json(null, 204);
    }
}
