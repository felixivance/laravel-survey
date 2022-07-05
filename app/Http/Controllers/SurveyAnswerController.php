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

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SurveyAnswer  $surveyAnswer
     * @return \Illuminate\Http\Response
     */
    public function edit(SurveyAnswer $surveyAnswer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SurveyAnswer  $surveyAnswer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SurveyAnswer $surveyAnswer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SurveyAnswer  $surveyAnswer
     * @return \Illuminate\Http\Response
     */
    public function destroy(SurveyAnswer $surveyAnswer)
    {
        //
    }
}
