<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SurveyController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->user();
        return Survey::where('user_id', $user->id)->paginate();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        $request->merge(['user_id'=> Auth::id()]);

        $data = $request->validate([
            'title'=>'required | string| max:1000',
            'image'=>'nullable|string',
            'user_id'=>'exists:users,id',
            'status'=>'required|boolean',
            'description'=>'nullable|string',
            'expire_date'=>'nullable|date|after:tomorrow'
        ]);

      return  Survey::create($data);

    }

    public function show(Survey $survey, Request  $request)
    {
        if($request->user()->id !== $survey->user_id){
            return abort(403, 'unauthorized action');
        }
        return $survey;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function edit(Survey $survey)
    {
        //
    }


    public function update(Request $request, Survey $survey)
    {
        $data = $request->validate([
            'title'=>'required | string| max:1000',
            'user_id'=>'exists:users,id',
            'status'=>'required|boolean',
            'description'=>'nullable|string',
            'expire_date'=>'nullable|date|after:tomorrow'
        ]);
        if($survey->update($data)){
            return $survey;
        }else{
            return abort(500, 'error occurred updating survey');
        }
    }


    public function destroy(Survey $survey, Request $request)
    {
        if($request->user()->id !== $survey->user_id){
            return abort(403, 'unauthorized action');
        }
        $survey->delete();
        return response('Survey deleted successfully',204);
    }
}
