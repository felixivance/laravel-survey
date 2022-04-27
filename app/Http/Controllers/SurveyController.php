<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

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

        //check if image was sent
        if(isset($data['image'])){
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;
        }
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

    /**
     * @throws \Exception
     */
    private function saveImage($image)
    {
        //check if image is valid base 64
        if(preg_match('/^data:image\/(\w+);base64,/', $image, $type)){
            $image = substr($image, strpos($image,',')+1);
            $type = strtolower($type[1]);

            if(!in_array($type, ['jpg','jpeg','gif','png'])){
                throw new \Exception('invalid image type');
            }

            $image = str_replace(' ','+',$image);
            $image = base64_decode($image);
            if(!$image){
                throw new \Exception('base 64 decode failed');
            }

        }else
            throw new \Exception("did not match; not a valid image");

        $dir = 'images/';
        $file = Str::random().'.'.$type;
        $absolutePath = public_path($dir);
        $relativePath = $dir.$file;

    }
}
