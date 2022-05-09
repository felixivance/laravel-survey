<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\URL;
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
        isset($request['status']) ? $request->merge(['status'=> 'inactive']): $request->merge(['status'=> $request['status']]);

        $data = $request->validate([
            'title'=>'required | string| max:1000',
            'image'=>'nullable|string',
            'user_id'=>'exists:users,id',
            'status'=>'required|string',
            'description'=>'nullable|string',
            'expire_date'=>'nullable|date|after:tomorrow'
        ]);

        //check if image was sent
        if(isset($data['image'])){
            try {
                $relativePath = $this->saveImage($data['image']);
                $data['image'] = $relativePath;
            } catch (\Exception $e) {
                \Log::info($e->getMessage());
            }

        }
      return  Survey::create($data);

    }

    public function show($id, Request  $request)
    {
        $survey = Survey::find($id);
        $survey->image_url = $survey->image ? URL::to($survey->image) : null;

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


    public function update(Request $request, $id)
    {

        //check if logged in user is the owner of the survey
        $survey = Survey::find($id)->first();

        if($survey->user_id !== Auth::id()){
            return "You are not permitted to perform this action!";
        }

        $data = $request->validate([
            'title'=>'required | string| max:1000',
            'image'=>'nullable|string',
            'user_id'=>'exists:users,id',
            'status'=>'required|boolean',
            'description'=>'nullable|string',
            'expire_date'=>'nullable|date|after:tomorrow'
        ]);
        //if image exists inside data
        if(isset($data['image'])){
            $relativePath = $this->saveImage($data['image']);
            $data['image']= $relativePath;

            //if there is an old image , delete it
            if($survey->image){
                $absolutePath = public_path($survey->image);
                File::delete($absolutePath);
            }
        }

        if($survey->update($data)){
            $survey->image_url = $survey->image ? URL::to($survey->image) : null;
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
            //take out the base64 encoded text without meme type
            $image = substr($image, strpos($image,',')+1);

            //get file extension
            $type = strtolower($type[1]);

            //check if file is an image
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

        if(!File::exists($absolutePath)){
            File::makeDirectory($absolutePath, 0755, true);
        }

        file_put_contents($relativePath, $image);

        return $relativePath;

    }
}
